const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/fileUploader').then(()=>{
//     console.log('Success: Connected to Db');
// }).catch((e) => {
//     console.log('Error! Connection Failed to Db');
// })
mongoose.connect('mongodb+srv://peter:eNSqAd7eATH0zMh4@cluster0.jhbf8.mongodb.net/lms-panel?retryWrites=true&w=majority').then(() => {
    console.log('Success: Connected to Db');
}).catch((e) => {
    console.log('Error! Connection Failed to Db');
})