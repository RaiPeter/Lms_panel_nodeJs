const bcrypt = require('bcryptjs');
const Signup_model = require('../models/singupSchema');
const Course_model = require('../models/courseSchema');
const Class_model = require('../models/classSchema');


exports.home = async (req, res) => {
    try {
        const username = req.user.username;
        res.render('index', {
            user_name: username
        })
    } catch (e) {
        res.status(500).render('error500');
    }
}

exports.signup = async (req, res) => {
    try {
        res.render('signup')
    } catch (e) {
        res.status(500).render('error500');
    }
}

exports.signupPost = async (req, res) => {
    try {
        const signupdata = new Signup_model({
            username: req.body.signup_name,
            password: req.body.signup_pass
        })

        await signupdata.generateAuthToken();
        await signupdata.save();
        res.status(201).redirect('/');

    } catch (e) {
        res.status(400).send('Something Error Occured')
    }
}

exports.loginPost = async (req, res) => {
    try {
        const userDetails = await Signup_model.findOne({ username: req.body.login_user })
        const isMatch = await bcrypt.compare(req.body.login_pass, userDetails.password)
        if (isMatch) {

            const token = await userDetails.generateAuthToken();
            res.cookie('beetabie', token, {
                expires: new Date(Date.now() + 1000000),
                httpOnly: true
            })
            res.redirect('/');
        } else {
            res.render('login', { error: 'Invalid Credentials' })
        }

    } catch (e) {
        res.status(400);
        res.render('login', { error: 'Invalid Credentials' })
    }
}

exports.login = async (req, res) => {
    try {
        res.render('login')
    } catch (e) {
        res.status(500).render('error500')
    }
}
// logout 
exports.logout = async (req, res) => {
    try {
        req.user.tokens = []
        res.clearCookie('beetabie')
        await req.user.save()
        res.redirect('/login')
    } catch (e) {
        res.status(500).render('error500');
    }
}


exports.add_course = async (req, res) => {
    try {
        res.render('add-course')
    } catch (e) {
        res.status(500).render('error500');
    }
}

exports.add_coursePost = async (req, res) => {
    try {

        const rand = Math.random().toString(36).slice(2, 15);
        const courseData = new Course_model({
            flag: 'course' + rand,
            title: req.body.title,
            description: req.body.description,
            thumbnail: req.file.filename,
            intro: req.body.introlink,
            intro: req.body.introlink,
            price: req.body.price,
            discount: req.body.discount,
            status: req.body.status
        })
        await courseData.save();
        res.redirect('/courses');

    } catch (e) {
        res.status(500).render('error500')
    }
}


exports.courses = async (req, res) => {
    try {
        const courseData = await Course_model.find()
        res.render('courses', {
            data: courseData
        })
    } catch (e) {
        res.status(500).render('error500')
    }
}
exports.add_class = async (req, res) => {
    try {
        const course_invd = await Course_model.findById(req.query.course).select({ title: 1 })
        res.render('add-class', {
            data: course_invd
        })
    } catch (e) {
        res.status(500).render('error500')
    }
}

exports.add_classPost = async (req, res) => {
    try {
        const classData = new Class_model({
            courseId: req.body.course_id,
            classNo: req.body.class_no,
            classTitle: req.body.class_title,
            classDescription: req.body.class_description,
            classFile: req.file.filename
        })
        await classData.save();
        res.redirect('/courses');

    } catch (e) {
        res.status(500).render('error500')
    }
}

exports.classes = async (req, res) => {
    try {
        const view_classData = await Class_model.find({ courseId: req.query.course })
        res.render('view-classes', {
            data: view_classData
        })
    } catch (e) {
        res.status(500).render('error500')
    }
}

exports.edit_course = async (req, res) => {
    try {
        const edit_courseData = await Course_model.find({ _id: req.query.edit })
        res.render('edit-course', {
            data: edit_courseData[0]
        })
    } catch (e) {
        res.status(500).render('error500')
    }
}
exports.edit_coursePost = async (req, res) => {
    try {
        await Course_model.findByIdAndUpdate(
            { _id: req.body.course_id },
            {
                $set: {
                    title: req.body.course_title,
                    description: req.body.course_description,
                    intro: req.body.course_intro,
                    price: req.body.course_price,
                    discount: req.body.course_discount,
                    status: req.body.course_status
                }
            }
        )
        res.redirect('/courses')

    } catch (e) {
        res.status(500).render('error500')
    }
}
exports.delete_course = async (req, res) => {
    try {
        await Course_model.findByIdAndDelete({ _id: req.query.course })
        res.redirect('/courses')

    } catch (e) {
        res.status(500).render('error500')
    }
}

// class 
exports.edit_class = async (req, res) => {
    try {
        const edit_classData = await Class_model.findById({ _id: req.query.class })
        res.render('edit-class', {
            data: edit_classData
        })

    } catch (e) {
        res.status(500).render('error500')
    }
}
// update class 
exports.edit_classPost = async (req, res) => {
    try {
        await Class_model.findByIdAndUpdate(
            { _id: req.body.class_id },
            {
                $set: {
                    classNo: req.body.class_no,
                    classTitle: req.body.class_title,
                    classDescription: req.body.class_description,
                }
            }
        )
        res.redirect('/courses')

    } catch (e) {
        res.status(500).render('error500')
    }
}
// delete class 

exports.delete_class = async (req, res) => {
    try {
        await Class_model.findByIdAndDelete({ _id: req.query.class })
        res.redirect('/courses')
    } catch (e) {
        res.status(500).render('error500')
    }
}

// error 
exports.error = async (req, res) => {
    try {
        res.status(404)
        res.render('error404.hbs')
    } catch (e) {
        res.status(500).render('error500')
    }
}

