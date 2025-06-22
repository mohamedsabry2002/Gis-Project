const parkModel = require('../models/parkModel');
const axios = require('axios');
const { Client } = require('@googlemaps/google-maps-services-js');
const googleMapClient = new Client({});
const asyncHandler = require('express-async-handler');
const apiError = require('../utils/apiError');



exports.getALLParks = async (req, res) => {  
  const parks = await parkModel.find({ available:true});
    res.status(200).json({ data: parks });
};

exports.addPark = async (req, res) => {
    const park = await parkModel.create(req.body);
    res.status(201).json({ data: park })
};

exports.getPark =async(req, res) => {
    const {id} = req.params.id;
    const park = await parkModel.findById({id});
    res.status(200).json({ status: 'success', data: park });
};

exports.updatePark = async (req, res) => {
  const id = req.params;

  const park = await parkModel.findOneAndUpdate(
      { _id: id },
      {
          location: req.body.location,
          available: req.body.available,
          type: req.body.type
      },
      {
          new: true
      }
  );

  res.status(200).json({ data: park });
};

exports.deletePark = async (req, res) => {
  const id = req.params.id;

  const park = await parkModel.findOneAndDelete({ _id: id });

  res.status(201).json({ message: 'Deleted successfully' });
};

exports.getNearbyPark = async (req, res, next) => {
  const { lat, lng, type, available, maxDistance  } = req.query;

  const filters = {};

  if (type) filters.type = type;

  if (available !== undefined) filters.available = available === 'true';

  const parks = await parkModel.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        $maxDistance: parseInt(maxDistance, 10) || 5000
      }
    },
    ...filters
  }).limit(5);

  res.status(200).json({
    status: 'success',
    results: parks.length,
    data: parks
  });
};

exports.getDistanceToPark = async (req, res, next) => {
    const { lat, lng, id } = req.query;
  
    try {
      const park = await parkModel.findById(id);
      if (!park) {
        return res.status(404).json(`NO Park Founded`);
      }
  
      const [parkLng, parkLat] = park.location.coordinates;
  
      const toRad = angle => (angle * Math.PI) / 180;
      const R = 6371e3; // meters
      const φ1 = toRad(lat);
      const φ2 = toRad(parkLat);
      const Δφ = toRad(parkLat - lat);
      const Δλ = toRad(parkLng - lng);
  
      const a = Math.sin(Δφ / 2) ** 2 +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      const distance = R * c;
  
      res.status(200).json({ status: 'success', distanceInMeters: Math.round(distance) });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err.message });
    }
  };

exports.searchGooglePlaces = asyncHandler(async (req, res, next) => {
  try {

    const { lat, lng, category, radius } = req.query;

    if (!lat || !lng || !category) {
      return res.status(400).json({ message: 'Missing required parameters: lat, lng, or category' });
    }

    const encodedCategory = encodeURIComponent(category.trim());
    const location = `${lat},${lng}`;
    const radiusValue = radius || 5000; 

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radiusValue}&type=${encodedCategory}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error.message);
    res.status(500).json({ message: 'Failed to fetch places', error: error.message });
  }
});