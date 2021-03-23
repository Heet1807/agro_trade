const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {User , validate } = require('../models/user');

const router = express.Router();

router.get('/getusers',async (req,res)=>{
    try {
        let result = await User.find();
        console.log(result);
        res.send(result); 
        
    } catch(e){
        res.status(400).send(e);
    }    
});

// router.get('/getuser/:phone',async (req,res)=>{
//     try {
//         const _phone = req.params.phone;
//         const userData = await User.findOne(_phone); 
//         console.log(userData);
//         res.send(userData); 
//     }catch(e){
//         res.status(400).send(e);
//     }    
// });

router.post('/adduser',async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let getUser = await User.findOne({ phone : req.body.phone });
    if(getUser) return res.status(400).send('User Already Registered.');
    
    let user = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        phone : req.body.phone,
        password : req.body.password
    });
    const salt =await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);
    user = await user.save();

    const token = user.generateAuthToken();

    res.send(user);
    ///  = jwt.sign({ _id : user._id} , config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email']));
    // }catch (err) {
    //     res.status(400).send(err.message);
    // }
});

// //update the user by id
// router.patch("/users/:id",async(req,res) => {
//     try{
//         const _id = req.params.id;
//         const updateUsers= await User.findByIdAndUpdate(_id, req.body, {
//             new : true,
//         });
//         res.send(updateUsers);
//     }catch(e){
//         res.status(404).send(e);
//     }
// });

// //delete the user by id
// router.delete("/users/:id", async(req,res) =>{
//     try {
//         const deleteUsers = await User.findByIdAndDelete(req.params.id);
//         if (!req.params.id) {
//             return res.status(404).send();
//         }
//         res.send(deleteUsers);           
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

module.exports = router;