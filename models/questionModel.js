const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'You must fill question name'],
    },
    options:[
        {
            type:String,
            required:true,
        }
    ],
    answer:{
        type:String,
        required:true,
    },
    image:String,
    number:{
        type:Number,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true,
        enum:['easy','medium','hard']
    }
},
{timestamps:true});

const Question = mongoose.model('Questions',questionSchema);
module.exports = Question;