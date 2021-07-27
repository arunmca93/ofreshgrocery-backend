const express = require('express')
const app = express()

//Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json() )

//Import utils
const { env } = require('./utils')

//Import DB
const db = require('./models')

//Importing Routes
app.use('/users',require('./routes/users'));

app.get('/',(req, res) => {
    res.json('API Server running on port 4000')
})


db.sequelize.sync().then(()=>{
    app.listen(env.PORT, (req, res)=>{
        console.log(`API Server running on port ${env.PORT}`)
    })
}).catch(err =>{ 
    console.log('Error while sync the DB....')
    console.log(err)
})