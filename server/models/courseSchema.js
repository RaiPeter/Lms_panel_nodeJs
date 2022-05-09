const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    flag:{
        type:String,
        required: true
    },
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type:String,
        required: true
    },
    intro: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type:Number,
        required: true,
        default: 0
    },
    status: {
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})


// collection 
const Course_model =  new mongoose.model('Course', courseSchema)
module.exports = Course_model;