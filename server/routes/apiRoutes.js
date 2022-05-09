const express = require("express");
const apirouter = express.Router();
const Course_model = require('../models/courseSchema');
const Class_model = require('../models/classSchema');
const api_auth = require('./api_auth')

// all course 
apirouter.get('/courses', async (req, res) => {
    try {
        const course_data = await Course_model.find({ status: 'Active' }).select({ _id: 0, status: 0, date: 0, __v: 0 });
        res.json(course_data)
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})
// invd course 
apirouter.get('/courses/:flag', async (req, res) => {
    try {
        console.log(req.params);
        const flag = req.params.flag;
        const ivdCourse_data = await Course_model.findOne({ flag: flag, status: 'Active' }).select({ _id: 0, status: 0, date: 0, __v: 0 });
        console.log('invds ', ivdCourse_data);
        res.json(ivdCourse_data)
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

// ========= all class by get ==========
apirouter.get('/class/:course', async (req, res) => {
    try {
        console.log(req.params);
        const course = req.params.course;
        const Class_data = await Class_model.find({ courseId: course }).select({ date: 0, __v: 0 });
        console.log('Class ', Class_data);
        res.json(Class_data)
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})
// =========== singel class by get===========
apirouter.get('/class_invd/:id', async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params.id;
        const invdClass_data = await Class_model.find({ _id: id }).select({ date: 0, __v: 0 });
        console.log('Invd Class ', invdClass_data);
        res.json(invdClass_data)
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})
 

// ===============
// all class by post 
apirouter.post('/class/:course',api_auth, async (req, res) => {
    try {
        const course = req.params.course;
        const Class_data = await Class_model.find({ courseId: course }).select({ date: 0, __v: 0 });
        res.json(Class_data)
    } catch (e) {
        res.send(e);
    }
})

// single class by post 
apirouter.post('/class_invd/:id',api_auth, async (req, res) => {
    try {
        const id = req.params.id;
        const invdClass_data = await Class_model.find({ _id: id }).select({ date: 0, __v: 0 });
        res.json(invdClass_data)
    } catch (e) {
        res.status(400).send(e);
    }
})




module.exports = apirouter;