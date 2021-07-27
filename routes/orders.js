const router = require('express').Router()
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

const { env, _ } = require('../utils')

//Models
const db = require('../models'); 
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');


router.get('/',(req, res) => {
    res.json('orders base');
})



router.post('/search', async (req, res) => {
    
    try{
    const data = req.body

    if(!data.key || data.key==='')
        return res.json(_([],404,'Invalid key'));

    let query = `select tag.id tag_id, tag.name, item.name item_name,
    un.name unit_name, un.code from unit un
    inner join grocery_items item on item.unit_id = un.id
    inner join tags tag on tag.grocery_item_id = item.id
    where item.is_active=true and item.is_removed=false and 
    tag.grocery_item_id in (select grocery_item_id from tags where lower(name) like '%${data.key}%')`

    let list = await sequelize.query(query,{ raw: false, type:QueryTypes.SELECT})

    return res.json(_(list,200,'Item list!'));

    }catch(err){
        console.log(err)
        return res.json(_([], 400, 'There is an error while searching items!!!'));
    }
})


router.post('/create', async (req, res) => {
    
    try{
    const data = req.body

    const order = await db['groceryOrders'].create({
        name:data.name,
        description:data.description,
        userId:data.user_id,
        shopId:data.shop_id,
        addressId:data.address_id
    })

    console.log(order.id)

    data.items.forEach(async (item) => {
        const item_insert = await db['groceryOrdersLine'].create({
            orderId:order.id,
            tagId:item.tag_id,
            quantity:item.quantity,
            description:item.description
        })
    });
    
    return res.json(_([],200,'List created!'));

    }catch(err){
        console.log(err)
        return res.json(_([], 400, 'There is an error while creating list!!!'));
    }
})


router.put('/:id', async (req, res) => {
    
    try{
    const data = req.body
    const order_id= req.params.id

    const order = await db['groceryOrders'].findOne({where:{id:order_id}});


        order.name=data.name,
        order.description=data.description,
        order.userId=data.user_id,
        order.shopId=data.shop_id,
        order.addressId=data.address_id

        order.save();

    const delete_order_line = await db['groceryOrdersLine'].destroy({where:{orderId:order.id}});

    data.items.forEach(async (item) => {
        const item_insert = await db['groceryOrdersLine'].create({
            orderId:order.id,
            tagId:item.tag_id,
            quantity:item.quantity,
            description:item.description
        })
    });
    
    return res.json(_([],200,'List updated!'));

    }catch(err){
        console.log(err)
        return res.json(_([], 400, 'There is an error while updating list!!!'));
    }
})

router.delete('/:id', async (req, res) => {
    
    try{
    const order_id= req.params.id

    const order = await db['groceryOrders'].findOne({where:{id:order_id}});

        order.is_active=false
        order.is_removed=true

        order.save();
    
    return res.json(_([],200,'List deleted!'));

    }catch(err){
        console.log(err)
        return res.json(_([], 400, 'There is an error while deleting list!!!'));
    }
})

module.exports = router