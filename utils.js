const environment = require('dotenv').config({ path: './.env' });

const env = process.env

const _ =(data=[], code=200, msg='') => {
    return ({data, code, msg});
}


const authMidwre = (permission) => {

    return (req, res, next)=>{

        console.log('Middleware!!!', permission);

        next()
    }
}

module.exports = {
    env,
    _,
    authMidwre
}