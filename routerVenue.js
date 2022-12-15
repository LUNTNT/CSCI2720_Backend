const express = require('express');
const router = express.Router();

const schema = require('./schema');

router.get('/', async (req, res) => {
    await schema.Venue
    .find({}, '-__v') 
    .exec(async function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});

        if (!e) 
            return res.status(404).send({'Message': 'No Venue Found'});

        let mergeVenues = [];
        await schema.Event.aggregate(
            [ 
                { "$group":  { "_id": "$venueid", "eventCount": { "$sum": 1 } } }
            ], async (eerr, ee) => {
                if (eerr) 
                return res.status(500).send({'Message': err});
    
                if (!ee) 
                    return res.status(404).send({'Message': 'No Event Found'});

                for (let i=0; i < e.length; i++) {
                    await mergeVenues.push({
                        ...e[i]._doc,
                        ...(ee.find((eeitem) => e[i]._id.equals(eeitem._id))),
                    });
                }

                return res.send(mergeVenues);
        });

        
    });
});

router.get('/:venueId',async (req, res) => {
    schema.Venue
    .findOne({ id: req.params['venueId']}, '-__v')
    .exec(async function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});
        if (!e) 
            return res.status(404).send({'Message': 'Venue Id Not Found'});

        const eventCount = await schema.Event.find({venueid: e._id}).count();
        
        return res.send({...e._doc, eventCount: eventCount})
    });
});

router.post('/', (req, res) => {
    let currentId = Math.floor(Math.random() * 1000);
    schema.Venue.findOne({}, 'id').sort({id : -1}).exec(function(err, e) {
        if (e || !err) 
            currentId = e.id + 1;

        schema.Venue.create({
            ...req.body, 
            id: currentId,
        }, (eerr, ee) => {
            if (eerr)
                return res.status(500).send({'Message': eerr});
            else
                return res.status(201).send(ee);
        });
    });

});

router.put('/:venueId', (req, res) => {
    schema.Venue.updateOne({ id: req.params['venueId']}, req.body, (eerr, ee) => {
        if (eerr)
            return res.status(500).send({'Message': eerr});
        else
            return res.status(200).send(ee);
    });
});

router.delete('/:venueId', (req, res) => {
    schema.Venue.findOneAndDelete({id: req.params['venueId']}, function(err, e) {
        if (err)
            return res.status(500).send({'Message': err});
  
        if (!e)
            return res.status(404).send({'Message': 'Event Id Not Found'});
  
        return res.status(204).send('');
    })
});

router.get('/search', (req, res) => {

    schema.Venue.find({venuee : req.query['keyword']}, function(err, e) {

        if (err) 
            return res.status(500).send({'Message': err});
        if (!e) 
            return res.status(404).send({'Message': 'Keyword Not Found'});

        return res.send(ee)
    });
});

module.exports = router;