const environment = require('dotenv').config({ path: './.env' });
const jwt = require('jsonwebtoken')

const env = process.env

const _ =(data=[], code=200, msg='') => {
    return ({data, code, msg});
}


const authMidwre = (authPermission) => {

    return async (req, res, next)=>{

        if(!req.headers.authorization || req.headers.authorization=='')
        return res.json(_([],403,'Token missing'))

        let token = req.headers.authorization.split(' ');

        if(token.length!==2)
        return res.json(_([],403,'Invalid token format!'))

        jwt.verify(token[1],env.JWT_SECRET,(err, data) => {

            if(err)
            return res.json(_([],403,'Token verification failed!'))

            if(data.permission.indexOf(authPermission)<0)
            return res.json(_([],403,'Permission not allowed!'))

            req.user = data

            next()

        })
        
    }
}

module.exports = {
    env,
    _,
    authMidwre
}