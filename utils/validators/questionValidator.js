const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const { check } = require("express-validator");

exports.createQuestionValidator = [
    check('name')
    .notEmpty()
    .withMessage('Question must have a name')
    .isLength({ min:1 })
    .withMessage('Name is too short')
    .isLength({ max:300 })
    .withMessage('Name is too long'),

    check('answer')
    .notEmpty()
    .withMessage('Question must have an answer'),

    check('number')
    .notEmpty()
    .withMessage('Question must have a number'),

    check('category')
    .notEmpty()
    .withMessage('Question must have a category'),

    check('level')
    .notEmpty()
    .withMessage('Question must have a level'),

    validatorMiddleware,
];

exports.updateQuestionValidator = [
    check('id').isMongoId().withMessage('Invalid Question ID'),
    check('name')
    .notEmpty()
    .withMessage('Question must have a name')
    .isLength({ min:1 })
    .withMessage('Name is too short')
    .isLength({ max:300 })
    .withMessage('Name is too long'),

    check('answer')
    .notEmpty()
    .withMessage('Question must have an answer'),

    check('number')
    .notEmpty()
    .withMessage('Question must have a number'),

    check('category')
    .notEmpty()
    .withMessage('Question must have a category'),

    check('level')
    .notEmpty()
    .withMessage('Question must have a level'),
    validatorMiddleware,
];

exports.getQuestionValidator = [
    check('id').isMongoId().withMessage('Invalid Question id'),
    validatorMiddleware,
];

exports.deleteQuestionValidator = [
    check("id").isMongoId().withMessage("Invalid question id format"),
    validatorMiddleware,
];