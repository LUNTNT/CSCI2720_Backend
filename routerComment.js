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

router.get('/:venueId', (req, res) => {
    schema.Venue.findOne({id : req.params['venueId']}, 'id venuee', function(err, e) {

        if (err) 
            return res.status(500).send({'Message': err});
            
        if (!e) 
            return res.status(406).send({'Message': 'Venue Id Not Found'})

        schema.Comment
        .find({'venue': e._id}, '-_id') 
        .populate('user', '-_id id username') 
        .populate('venue', '-_id id venuee') 
        .exec(function (eerr, ee) {
        if (eerr) 
            return res.status(500).send({'Message': eerr});
    
        if (!ee) 
            return res.status(404).send({'Message': 'No Event Found'});
    
        return res.send(ee)
        });
    });
});

router.post('/:userId/:venueId', (req, res) => {
    let currentId = 0;
    schema.Comment.findOne({}, 'id').sort({id : -1}).exec(function(err, e) {
        if (!err || e)
            currentId = e.id + 1;

        schema.Venue.findOne({id : req.params['venueId']}, 'id venuee', function(verr, ve) {

            if (verr) 
                return res.status(500).send({'Message': verr});
                
            if (!ve) 
                return res.status(406).send({'Message': 'Venue Id Not Found'})
    
            schema.User.findOne({id : req.params['userId']}, 'id username', function(uerr, ue) {
    
                if (uerr) 
                    return res.status(500).send({'Message': uerr});
                    
                if (!ue) 
                    return res.status(406).send({'Message': 'User Id Not Found'})
    
                schema.Comment.create({
                    id: currentId,
                    content: req.body['content'],
                    venue: ve._id,
                    user: ue._id,
                }, (err, e)=> {
                    if (err)
                        return res.status(500).send({'Message': err});
                    else
                        return res.status(201).send(e);
                });
            });
        });
    })
});

router.delete('/:commentId', (req, res) => {
    schema.Comment.findOneAndDelete({id : req.params['commentId']}, function(err, e) {

        if (err) 
            return res.status(500).send({'Message': err});
            
        if (!e) 
            return res.status(406).send({'Message': 'Comment Id Not Found'})

        return res.status(200).send(e)
    });
});

module.exports = router;