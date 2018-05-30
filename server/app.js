
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
const cors = require('cors');
const stores = require('./routes/stores');
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;




// Connect To Database
mongoose.connect(config.database, {
  useMongoClient: true
});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});


const app = express();



// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', stores);






//Starting The Server
app.listen(port, () => {
  console.log("Server started on port " + port)
})