var express = require('express');
const { default: mongoose } = require('mongoose');
const {mongodb,mongoosedbName,dbUrl} = require('../config/dbConfig')
const {userModel} = require('../schema/userSchema')
const {hashPassword,hashCompare,createToken,decodeToken,validate,roleAdmin} = require('../config/auth')
var router = express.Router();

mongoose.connect(dbUrl)

router.get('/all-users',validate,roleAdmin,async(req,res)=>{
  try {
    let users = await userModel.find({},{password:0})
    res.send({statusCode:200,users,message:"Data Fetch Successfull"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"}) 
  }
})

router.post('/signup',async(req,res)=>{
  try {
      let user = await userModel.findOne({email:req.body.email})
      if(!user)
      {
          let hashedPassword = await hashPassword(req.body.password)
          req.body.password = hashedPassword
          let newUser = await userModel.create(req.body)
          res.send({statusCode:200,message:"User Signup Successfull"})
      }
      else
        res.send({statusCode:400,message:"User already exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"}) 
  }
})

router.post('/login',async(req,res)=>{
  try {
    let user = await userModel.findOne({email:req.body.email})
    if(user)
    {
      if(await hashCompare(req.body.password,user.password))
      {
          let token = await createToken(user)
          res.send({statusCode:200,message:"Login Successfull",token})
      }
      else
        res.send({statusCode:400,message:"Invalid Credentials"})
    }
    else
      res.send({statusCode:400,message:"User Does not exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"}) 
  }
})

module.exports = router;


