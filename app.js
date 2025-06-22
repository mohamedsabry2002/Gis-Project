const express = require('express');
const mongoose = require('mongoose');
const dbConnection = require('./config/database');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const parkRoute = require('./routes/parkRoute');

dbConnection();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
    console.log(process.env.NODE_ENV);
}


//mount routes
app.use('/api/parking', parkRoute)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
});

//handle rejection outside express
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection: ${err.name} | ${err.message}`);
    server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
    });
});