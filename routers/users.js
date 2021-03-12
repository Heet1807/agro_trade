const express = require('express');
const mongoose = require('mongoose');
const {User , validate } = require('../models/user');

const router = express.Router();

router.post('/addUser',async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // let getUser = await User.findOne({ email : req.body.email });
    // if(getUser) return res.status(400).send('User Already Registered.');
    
    let user = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        phone : req.body.phone,
        password : req.body.password
    });
    user = await user.save();
    res.send(user);
    // try {
    //     const addUsrRecords = new User(req.body);
    //     console.log(req.body);
    //     const insertUser = await addUsrRecords.save();
    //     res.status(201).send(insertUser);
    // } catch (e) {
    //     res.status(400).send(e);        
    // }
});

router.get('/',async (req,res)=>{
    try {
        let result = await User.find();
        res.send(result);   
    } catch(e){
        res.status(400).send(e);
    }    
});

module.exports = router;