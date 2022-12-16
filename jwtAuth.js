// CSCI-2720 Project Group 30 Culture Programme

// Group Members:

// 1155141928 Cheuk Chun Lok            

// 1155143453 Shek Wui Lun            

// 1155142754 Chiu Man Ho

// 1155126403 Wong Yu Shing            

// 1155143965 Yau Chun Tung              

// 1155143076 Yeung Sze Ki

const jwt = require('jsonwebtoken')
require('dotenv').config(); // Env variables

function authenticateAdminToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) 
        return res.status(401).send({'Error': 'Not Yet Login'})

    jwt.verify(token, process.env.SECRET_KEY, async(err, user)=>{
        
        if(err) 
            return res.sendStatus(403).send({'Error': err})

        if (user.userType !== 'admin') 
            return res.sendStatus(403).send({'Error': 'User Not Permission'})

        next();
    })
}

function authenticateUserToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) 
        return res.status(401).send({'Error': 'Not Yet Login'})

    jwt.verify(token, process.env.SECRET_KEY, async(err, user)=>{
        
        if(err) 
            return res.sendStatus(403).send({'Error': err})

        next();
    })
}

function createToken(name, type) {
    const obj = {'username': name, 'userType': type}

    return jwt.sign(obj, process.env.SECRET_KEY)
}

module.exports = {authenticateAdminToken, authenticateUserToken, createToken};