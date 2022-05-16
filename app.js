
require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 3033;
const hbs = require('hbs');
const cors = require('cors')
const cookie_Parser = require('cookie-parser');
app.use(cookie_Parser())
const corsOptions = {
    origin: "*"
};
// db connection 
require('./server/db/conn')

// paths 
const static_Path = path.join(__dirname, 'public');
const template_Path = path.join(__dirname, 'template/views');
const partials_Path = path.join(__dirname, 'template/partials');

// midleware 
app.use(express.static(static_Path))
app.use(cors(corsOptions))
// template engine 
app.set('view engine', 'hbs');
app.set('views', template_Path);
hbs.registerPartials(partials_Path);


app.use(function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
     //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// routes 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const routes = require('./server/routes/webRoutes');
const cookieParser = require('cookie-parser');
app.use('/', routes);

// api routes 
const api_routes = require('./server/routes/apiRoutes');
app.use('/api', api_routes);


app.listen(port, () => {
    console.log(`listing at http://localhost:${port}`);
})
