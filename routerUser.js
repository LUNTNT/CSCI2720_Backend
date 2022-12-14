const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const jwtAuth = require('./jwtAuth');
const schema = require('./schema');

app.post('/login', async (req, res)=>{
    const {username, password} = req.body

    schema.User.findOne({username: username}, async (err, e)=> {
        if (err) return res.status(500).json({'Message': err})

        if(!e){
            return res.status(404).json({'Message': 'User Not Found'})
        }

        if(await bcrypt.compare(password, user.password)){
            const accessToken = jwtAuth.createToken(e.username, e.userType)
            return res.send({accessToken: accessToken, 'Message': 'Login Successfully'})

        }else{
            return res.status(403).json({'Message': 'Wrong Password'})
        }
    });
});



module.exports = router;