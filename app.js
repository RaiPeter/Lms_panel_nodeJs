require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const port =  3000;
const hbs =  require('hbs');
const cookie_Parser = require('cookie-parser');
app.use(cookie_Parser())
// db connection 
require('./server/db/conn')

// paths 
const static_Path =  path.join(__dirname, 'public');
const template_Path =  path.join(__dirname, 'template/views');
const partials_Path =  path.join(__dirname, 'template/partials');

// midleware 
app.use(express.static(static_Path))


// template engine 
app.set('view engine', 'hbs');
app.set('views', template_Path);
hbs.registerPartials(partials_Path);


// routes 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const routes = require('./server/routes/webRoutes');
const cookieParser = require('cookie-parser');
app.use('/', routes);

// api routes 
const api_routes = require('./server/routes/apiRoutes');
app.use('/api', api_routes);


app.listen(port, ()=>{
    console.log(`listing at http://localhost:${port}`);
})