const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const jwtAuth = require('./jwtAuth');
const schema = require('./schema');

router.post('/login', (req, res)=>{
    const {username, password} = req.body

    schema.User.findOne({username: username}, (err, e)=> {
        if (err) return res.status(500).json({'Message': err})

        if(!e){
            return res.status(404).json({'Message': 'User Not Found'})
        }

        bcrypt.compare(password, e.password, (cerr, ce) => {
            if (cerr)
                return res.status(403).json({'Message': cerr})
            console.log(password, e.password)
            if (ce) {
                const accessToken = jwtAuth.createToken(e.username, e.userType)
                return res.send({accessToken: accessToken, 'Message': 'Login Successfully'})
            } else
                return res.status(403).json({'Message': 'Wrong Password'})

        })
    });
});

router.post('/login/admin', (req, res)=>{
    const {username, password} = req.body

    schema.User.findOne({username: username}, (err, e)=> {
        if (err) return res.status(500).json({'Message': err})

        if(!e){
            return res.status(404).json({'Message': 'User Not Found'})
        }

        bcrypt.compare(password, e.password, (cerr, ce) => {
            if (cerr)
                return res.status(403).json({'Message': cerr})

            if (ce && e.userType == 'admin') {
                const accessToken = jwtAuth.createToken(e.username, e.userType)
                return res.send({accessToken: accessToken, 'Message': 'Login Successfully'})
            } else
                return res.status(403).json({'Message': 'Wrong Password Or No Permission'})

        })
    });
});

// User Favourite Venues / Location
router.get('/favouriteVenues/:userId', (req, res) => {
    schema.User
    .find({id : req.params['userId']}, '-_id id favouriteVenues') 
    .populate('favouriteVenues', '-_id id venuee')
    .exec(function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});

        if (!e) 
            return res.status(404).send({'Message': 'No Venue Found'});

        return res.send(e);
    });
});

router.post('/favouriteVenues/:userId/:venueId', (req, res) => {
    schema.Venue.findOne({id : req.params['venueId']}, 'id venuee', function(err, e) {

        if (err) 
            return res.status(500).send({'Message': err});
            
        if (!e) 
            return res.status(406).send({'Message': 'Venue Id Not Found'})

        schema.User.findOneAndUpdate({id: req.params['userId']}, 
        {"$push": { favouriteVenues : e._id }}, 
        (eerr, ee) => {
            if (eerr)
                return res.status(500).send({'Message': eerr});
            if (!ee)
                return res.status(406).send({'Message': "User Id Not Found"});

            return res.status(201).send(e);
        });
    });
});

router.delete('/favouriteVenues/:userId/:venueId', (req, res) => {
    schema.Venue.findOne({id : req.params['venueId']}, 'id venuee', function(err, e) {

        if (err) 
            return res.status(500).send({'Message': err});
            
        if (!e) 
            return res.status(406).send({'Message': 'Venue Id Not Found'})

        schema.User.findOneAndUpdate({id: req.params['userId']}, 
        {"$pull": { favouriteVenues : e._id }}, 
        (eerr, ee) => {
            if (eerr)
                return res.status(500).send({'Message': eerr});
            if (!ee)
                return res.status(406).send({'Message': "User Id Not Found"});

            return res.status(200).send(e);
        });
    });
});

router.get('/hash/:password', async (req, res) => {
    return res.send(await bcrypt.hash(req.params['password'], 10));
});

router.get('/', (req, res) => {
    schema.User
    .find({}, '-_id id username password userType') 
    .exec(function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});

        if (!e) 
            return res.status(404).send({'Message': 'No Event Found'});

        return res.send(e);
    });
});

router.get('/:userId', (req, res) => {
    schema.User
    .findOne({id: req.params['userId']}, '-_id id username userType') 
    .exec(function (err, e) {
        if (err) 
            return res.status(500).send({'Message': err});

        if (!e) 
            return res.status(404).send({'Message': 'No Event Found'});

        return res.send(e);
    });
});

router.put('/:userId', (req, res) => {
    if (req.body['password']) {
        bcrypt.hash(req.body['password'], 10, function(err, hash) {
            if (err)
                return res.status(500).send({'Message': eerr});

            req.body['password'] = hash;
        });
    }

    schema.User.updateOne({id: req.params['userId']}, req.body, (eerr, ee) => {
        if (eerr)
            return res.status(500).send({'Message': eerr});
        else
            return res.status(200).send(ee);
    });
});

module.exports = router;