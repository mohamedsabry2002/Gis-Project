const express = require('express');


const { uploadImage,
        uploadToCloudinary,
        addQuestion,
        getQuestions,
        getAllQuestions,
        getQuestion,
        updateQuestion,
        deleteQuestion,
        showAnswer} = require('../services/questionServices');

const { getQuestionValidator,
        createQuestionValidator,
        updateQuestionValidator,
        deleteQuestionValidator} = require("../utils/validators/questionValidator");

const router = express.Router();

router.route('/').get(getAllQuestions).post(uploadImage,uploadToCloudinary,createQuestionValidator,addQuestion);
router.route('/getQuestions').get(getQuestions);

router
.route('/:id')
.get(getQuestionValidator,getQuestion)
.put(updateQuestionValidator,updateQuestion)
.delete(deleteQuestionValidator,deleteQuestion);

router.route('/showAnswer').get(showAnswer);

module.exports = router