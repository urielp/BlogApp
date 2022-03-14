const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
let users = [];

const checkAuth = require('../middleware/check-auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.get('/user/:id', function(req, res, next) {
  res.json({message:"Hello User number",data:[]});
})
.post('/addUser', checkAuth,function(req, res, next) {
  users.push({name:req.body.name});
  res.json({message:"user was added",data:[...users]});
})
.post('/signUp',(req,res)=>{
  User.findOne({email:req.body.email,}).then(user=>{
    if(user){
      return res.status(400).json({message:"User with this email already exists "});
    }
    else
    {
      bcrypt.hash(req.body.password,10).then(hash=>{
        console.log(req.body.password);
        console.log(hash);
        const user = new User({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          passwordTest:hash,
          joinDate:new Date(moment().format('lll'))
        });
    
        user.save().then(result=>{
          let token = jwt.sign(
            {user:result.email,userID:result._id},
            "this_should_be_secret_or_salt_for_token", 
            {expiresIn:"1h"});
           res.setHeader('Autorization',token);
          res.status(201).json({message:"User Created",data:result})
        }).catch(error=>{
          res.status(500).json({message:"User was not created ",message:error});
        })
      })
    }
  });
})
.post('/login',(req,res)=>{
  let authonticatedUser;
 
  User.findOne({email:req.body.email,})
  .then(user=>{
    if(!user){
      console.log("user not found");
      return res.status(401).json({message:"User not found"});
    }
    authonticatedUser=user;
    console.log(authonticatedUser);
    
    return bcrypt.compare(req.body.password,authonticatedUser.password);
  })
  .then(results=>{
    console.log('login promise resolved');
    if(!results){
      return res.status(401).json({message:"Auth failed!",data:"oh no"});
    }
    let token = jwt.sign(
      {
        user:authonticatedUser.email,userID:authonticatedUser._id},
        "this_should_be_secret_or_salt_for_token",
      {expiresIn:"1h"});
      res.setHeader('Autorization',token);
      return res.status(200).json({
        message:"Success!!",
        token:token,
        user:{name:authonticatedUser.name,email:authonticatedUser.email},
        isLoggedIn:true
      });
    
  })
  .catch(err =>{
    return res.status(401).json({message:"Auth Failed",data:err});
  })
}).get('/verifyToken',(req,res)=>{
  try
  {
    jwt.verify(req.header("Authorization"),"this_should_be_secret_or_salt_for_token")
    console.log("token verified");
    res.status(200).json({message:"good",value:true});
  }
  catch(error){
    res.status(201).json({message:"go away",value:false,message:error});
  }

});


module.exports = router;
