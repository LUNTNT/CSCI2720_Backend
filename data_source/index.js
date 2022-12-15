const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Env variables

const eventRouter = require('./routerEvent');
const venueRouter = require('./routerVenue');
const userRouter = require('./routerUser');
const commentRouter = require('./routerComment');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.on('open', function(){
  console.log("Connection is open...");
})

//Routers
app.use('/event', eventRouter);
app.use('/venue', venueRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);

// handle ALL requests
app.all('/*', (req, res) => {
  // send this to client
  res.send('CSCI2720 Project Group 30 RESTful API Server');
});

// listen to port 13000
const server = app.listen(13000);
