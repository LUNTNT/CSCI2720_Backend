// CSCI-2720 Project Group 30 Culture Programme

// Group Members:

// 1155141928 Cheuk Chun Lok            

// 1155143453 Shek Wui Lun            

// 1155142754 Chiu Man Ho

// 1155126403 Wong Yu Shing            

// 1155143965 Yau Chun Tung              

// 1155143076 Yeung Sze Ki

const express = require('express');
const router = express.Router();

const schema = require('./schema');

router.get('/', (req, res) => {
    schema.Event
    .find({}, '-_id -__v') 
    .populate('venueid', '-_id -venuec  -__v') 
    .exec(function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});

        if (!e) 
            return res.status(404).send({'Message': 'No Event Found'});

        return res.send(e)
    });
});

router.get('/:eventId', (req, res) => {
    schema.Event
    .findOne({ id: req.params['eventId']}, '-_id  -__v')
    .populate('venueid', '-_id -venuec  -__v')  
    .exec(function (err, e) {
        if (err) return res.status(500).send({'Message': err});
        if (!e) return res.status(404).send({'Message': 'Event Id Not Found'});
        
        return res.send(e)
    });
});

router.post('/', (req, res) => {

    let currentId = Math.floor(Math.random() * 1000);
    schema.Event.findOne({}, 'id').sort({id : -1}).exec(function(err, e) {
        if (e || !err) 
            currentId = e.id + 1;
        console.log(e);

        schema.Venue.findOne({id : req.body['venueid']}, function(err, e) {

            if (err) return res.status(500).send({'Message': err});
            if (!e) return res.status(406).send({'Message': 'Venue Id Not Found'})
    
            req.body['venueid'] = e._id;
    
            schema.Event.create({
                ...req.body, 
                id: currentId,
            }, (eerr, ee) => {
                if (eerr)
                    return res.status(500).send({'Message': eerr});
                else
                    return res.status(201).send(ee);
            });
        });
    })


});

router.put('/:eventId', async (req, res) => {
    if (req.body['venueid']) {
        schema.Venue.findOne({id : req.body['venueid']}, function(err, e) {

            if (err) return res.status(500).send({'Message': err});
            if (!e) return res.status(406).send({'Message': 'Venue Id Not Found'});
    
            req.body['venueid'] = e._id;

            schema.Event.updateOne({ id: req.params['eventId']}, req.body, (eerr, ee) => {
                if (eerr)
                    return res.status(500).send({'Message': eerr});
                else
                    return res.status(200).send(ee);
            });
        });
    } else {
        schema.Event.updateOne({ id: req.params['eventId']}, req.body, (eerr, ee) => {
            if (eerr)
                return res.status(500).send({'Message': eerr});
            else
                return res.status(200).send(ee);
        });
    }


});

router.delete('/:eventId', (req, res) => {
    schema.Event.findOneAndDelete({id: req.params['eventId']}, function(err, e) {
        if (err)
            return res.status(500).send({'Message': err});
  
        if (!e)
            return res.status(404).send({'Message': 'Event Id Not Found'});
  
        return res.status(204).send('');
    })
});

router.get('/venue/:venueId', (req, res) => {

    schema.Venue.findOne({id : req.params['venueId']}, function(err, e) {

        if (err) return res.status(500).send({'Message': err});
        if (!e) return res.status(404).send({'Message': 'Venue Id Not Found'})

        schema.Event
        .find({'venueid': e._id}, '-_id') 
        .populate('venueid', '-_id -venuec') 
        .exec(function (eerr, ee) {
        if (eerr) 
            return res.status(500).send({'Message': eerr});
    
        if (!ee) 
            return res.status(404).send({'Message': 'No Event Found'});
    
        return res.send(ee)
        });
    });
});

module.exports = router;