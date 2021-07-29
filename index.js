const express = require('express')
const app = express()

//Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json() )

//CORS
const cors = require('cors')
app.use(cors({
    origin:'*'
}))

//Import utils
const { env, authMidwre } = require('./utils')

//Import DB
const db = require('./models')

//Importing Routes
app.use('/users',require('./routes/users'));
app.use('/orders',require('./routes/orders'));
app.use('/dashboard',require('./routes/dashboard'));


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
