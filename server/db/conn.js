const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fileUploader').then(()=>{
    console.log('Success: Connected to Db');
}).catch((e) => {
    console.log('Error! Connection Failed to Db');
})