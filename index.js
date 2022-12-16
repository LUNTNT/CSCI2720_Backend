// CSCI-2720 Project Group 30 Culture Programme

// Group Members:

// 1155141928 Cheuk Chun Lok            

// 1155143453 Shek Wui Lun            

// 1155142754 Chiu Man Ho

// 1155126403 Wong Yu Shing            

// 1155143965 Yau Chun Tung              

// 1155143076 Yeung Sze Ki

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
