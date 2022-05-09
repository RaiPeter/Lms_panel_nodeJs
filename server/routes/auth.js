const jwt = require('jsonwebtoken');
const Signup_model = require('../models/singupSchema')

const auth = async (req, res, next)=>{
    try {
        const token = req.cookies.beetabie;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        const user = await Signup_model.findOne({_id: verifyUser._id});
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        res.redirect('/login');
    }
}

module.exports = auth;
