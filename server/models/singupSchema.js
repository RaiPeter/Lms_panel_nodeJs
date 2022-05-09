const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generate autrh token 
signupSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens= this.tokens.concat({token: token})
        await this.save();
        return token;
    } catch (e) {
        // res.send('token errror');
        console.log(e);
    }
}

// password hasing 
signupSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})


// collection 
const Signup_model =  new mongoose.model('Register', signupSchema)
module.exports = Signup_model;