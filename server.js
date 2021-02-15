// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// POST route
app.post('/insert', insert);

function insert(req, res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/getData', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
};


// Setup Server
app.listen(process.env.port || 8888, () => console.log('server start on port 8888'))