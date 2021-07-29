const router = require('express').Router()
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

const { env, _ } = require('../utils')

//Models
const db = require('../models'); 
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');


router.get('/',(req, res) => {
    res.json('User base');
})

router.post('/register', async (req, res) => {
    
    try{
    const data = req.body

    const userCount = await db['Users'].count({where:{email:data.email, roleId:3}})

    userCount>0? res.json(_([],400,'Email ID already exists!')) : '';

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = await db['Users'].create({
        ...data,
        password:hash,
        salt,
        roleId:3
      });

    res.json(_([],200,'User registered successfully!'));

    }catch(err){
        console.log(err)
        res.json(_([], 400, 'There is error while registering user'));
    }
})

router.post('/login', async (req, res) => {
    
    try{
    const data = req.body

    const userData = await db['Users'].findOne({where:{email:data.email}})

    if(!userData || !userData.password || !await bcrypt.compare(data.password, userData.password))
        return res.json(_([],400,'Invalid Username and/or Password'));

    const query = `select usr.id, usr.name, usr.mobile, usr.email, usr.role_id, string_agg(per.name,',') permission from users usr 
    inner join roles_permissions_rel rel on rel."RoleId" = usr.role_id 
    inner join permissions per on per.id = rel."PermissionId"
    where usr.email='${data.email}' and usr.is_active=true and usr.is_removed=false
    group by usr.id, usr.name, usr.mobile, usr.email, usr.role_id`

    let [userInfo] = await sequelize.query(query,{ raw: false, type:QueryTypes.SELECT})

    userInfo.permission = userInfo.permission.split(',')

    const token = await jwt.sign(userInfo, env.JWT_SECRET)

    userInfo.token = token

    return res.json(_(userInfo,200,'User login info!'));

    }catch(err){
        console.log(err)
        return res.json(_([], 400, 'There is error while user login'));
    }
})


module.exports = router