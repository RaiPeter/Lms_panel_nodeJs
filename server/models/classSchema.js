const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    courseId:{
        type:String,
        required: true
    },
    classNo: {
        type: Number,
        required:true
    },
    classTitle: {
        type: String,
        required: true
    },
    classDescription: {
        type: String,
        required: true
    },
    classFile: {
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})


// collection 
const Class_model =  new mongoose.model('Class', classSchema)
module.exports = Class_model;