const router = require('express').Router()


const { env, _, authMidwre } = require('../utils')

//Models
const db = require('../models'); 
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');


router.get('/',authMidwre('can_view_dashboard'), async (req, res) => {

    try{
    const user = req.user
    let result = {}

    //Users
    if(user.role_id===3){

        const total_orders = await db['groceryOrders'].count({ where:{user_id:user.id, is_active:true, is_removed:false}})

        result = { total_orders }
    }

    res.json(_(result, 200,'Dashboard data!'));

    }catch(err){
        return res.json(_([], 400, 'There is an error while fetching dashboard data!!!'));

    }
})


module.exports = router