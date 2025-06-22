const questionModel = require('../models/questionModel');
const asyncHandler = require('express-async-handler');
const quizModel = require('../models/quizModel');
const apiError = require("../utils/apiError");
const userModel = require("../models/userModel");


exports.getAllQuestions = asyncHandler(async (req, res, next) => {
    const questions = await questionModel.find({});
    res.status(200).json({ results: questions.length, data: questions });
});


exports.addQuestion = asyncHandler(async (req, res, next) => {
    const question = await questionModel.create({
        name:req.body.name,
        level:req.body.level,
        category:req.body.category,
        options:req.body.options,
        number:req.body.number,
        answer:req.body.answer,
    });
    res.status(201).json({ data: question })
});

exports.getQuestion = asyncHandler(async(req, res, next) => {
    const id = req.params;
    const question = await questionModel.findById({id});
    if(!question){
        return next(apiError(`No Question for this id ${id}`),404);
    }
    res.status(201).json({ data: question });
});

exports.updateQuestion = asyncHandler(async(req, res, next) => {
    const {id} = req.params;    
    const question = await questionModel.findOneAndUpdate(
        {_id:id},
        {
            name: req.body.name,
            options: req.body.options,
            answer: req.body.answer
        },
        {
            new: true
        });
        if(!question){
            return next(new apiError(`NO question for this id ${id}`),404);
        }
        res.status(201).json({ data: question});
});

exports.deleteQuestion = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const question = await questionModel.findOneAndDelete(id);
    if(!question){
        return next(new apiError(`NO question for this id ${id}`),404);
    }
    res.status(201).json('Question Deleted Succesfully');
});

exports.showAnswer = asyncHandler(async(req, res, next) => {
    const {id} = req.params.id;    
    const question = await questionModel.findById(id);
    if(!question){
        return next(new apiError(`NO question for this id ${id}`),404);
    }
    res.status(200).json(question.answer);
});

exports.showOptions = asyncHandler(async(req, res, next) => {
    const {id} = req.params.id;    
    const question = await questionModel.findById(id);
    if(!question){
        return next(new apiError(`NO question for this id ${id}`),404);
    }
    res.status(200).json(question.options);
});


