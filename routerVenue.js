const express = require('express');
const router = express.Router();

const schema = require('./schema');

router.get('/', (req, res) => {
    schema.Venue
    .find({}, '-_id -__v') 
    .exec(function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});

        if (!e) 
            return res.status(404).send({'Message': 'No Event Found'});

        return res.send(e)
    });
});

router.get('/:venueId', (req, res) => {
    schema.Venue
    .findOne({ id: req.params['venueId']}, '-_id  -__v')
    .exec(function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});
        if (!e) 
            return res.status(404).send({'Message': 'Venue Id Not Found'});
        
        return res.send(e)
    });
});

router.post('/', (req, res) => {
    res.send('CSCI2720 Project Group 30 RESTful API Server');
});

router.put('/:venueId', (req, res) => {
    res.send('CSCI2720 Project Group 30 RESTful API Server');
});

router.delete('/:venueId', (req, res) => {
    res.send('CSCI2720 Project Group 30 RESTful API Server');
});

router.get('/search', (req, res) => {

    schema.Venue.find({id : req.query['keyword']}, function(err, e) {

        if (err) 
            return res.status(500).send({'Message': err});
        if (!e) 
            return res.status(404).send({'Message': 'Keyword Not Found'});

        return res.send(ee)
    });
});

module.exports = router;