const express = require("express");
const router = express.Router();
const webController = require('../controller/webController');
const auth = require('./auth')


const multer  = require('multer');
const path = require('path')
const server =  path.join(__dirname, '../');
const uploads = path.join(server, '../public/uploads/');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploads)
    },
    filename:function (req, file, callback) {
        callback(null, Date.now()+'-'+file.originalname);
    } 
})
// storage 2 
const classFile = path.join(__dirname, '../','../public/classes')
const storage2 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, classFile)
    },
    filename:function (req, file, callback) {
        callback(null, Date.now()+'class-'+file.originalname);
    } 
})

const upload = multer({storage:storage});
const uploadClass = multer({storage:storage2})


router.get('/',auth, webController.home);
router.get('/login', webController.login);
router.get('/signup', webController.signup);
router.post('/signup', webController.signupPost);
router.post('/login', webController.loginPost);
// router.get('/products',auth, webController.products);
router.get('/add-course', auth, webController.add_course);
router.post('/add-course',upload.single('thumbnail'), webController.add_coursePost);
router.get('/courses',auth,  webController.courses);
router.get('/add-class', auth,  webController.add_class);
router.post('/add-class',uploadClass.single('class_video'), webController.add_classPost);
router.get('/view-classes', auth, webController.classes);
router.get('/edit-course', auth, webController.edit_course);
router.post('/edit-course', webController.edit_coursePost);
router.get('/delet-course', auth, webController.delete_course);

// class 
router.get('/edit-class',auth, webController.edit_class);
router.post('/edit-class', webController.edit_classPost);
router.get('/delete-class',auth, webController.delete_class);

// logout 
router.get('/logout',auth, webController.logout);

// error page 
// router.get('*', webController.error);

module.exports = router;


