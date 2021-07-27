const environment = require('dotenv').config({ path: './.env' });

const env = process.env

const _ =(data=[], code=200, msg='') => {
    return ({data, code, msg});
}

module.exports = {
    env,
    _
}