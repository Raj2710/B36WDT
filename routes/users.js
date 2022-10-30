var express = require('express');
const { default: mongoose } = require('mongoose');
const {mongodb,mongoosedbName,dbUrl} = require('../config/dbConfig')
const {userModel} = require('../schema/userSchema')
const {hashPassword,hashCompare,createToken,decodeToken,validate,roleAdmin} = require('../config/auth')
var router = express.Router();
const {sendGridService} = require('../utils/email_service')

mongoose.connect(dbUrl)

router.get('/email/:emailid',async(req,res)=>{
  try {
    await sendGridService(req.params.emailid,"TEST Email",`<h1>Welcome to User Management</h1>`)
    res.send({statusCode:200,mesage:"Email Sent"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
})

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
          let otp = Math.round(Math.random()*10000)
          let data = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashedPassword,
            tempOTP:otp,
          }
          let emailBody = `
          <div style="width: 50%; 
          margin-left: 30%;
          margin-right: 30%; 
          background-color:hsl(0, 18%, 92%);
          padding: 10px;
          ">
         <div style="text-align: center;">
             <h2 style="color:green;">Time to Verify your Email</h2>
         </div>
         <div>
             <p>Hi ${data.firstName} ${data.lastName},</p>
             <p>Your OTP to verify your account is ${otp}. <br> It will expire in 5 minutes</p>
             <p style="text-align: center;">&#169; Guvi</p>
         </div>
     </div>`

          await userModel.create(data)
          await sendGridService(data.email,"One Time Verification",emailBody)
          res.send({statusCode:200,message:"User Signup Successfull"})
      }
      else
        res.send({statusCode:400,message:"User already exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"}) 
  }
})

router.post('/verify-email',async(req,res)=>{
  try {
    let user = await userModel.findOne({email:req.body.email})
    if(user)
    {
        if(req.body.otp===user.tempOTP)
        {
          user.tempOTP=null
          user.emailVerify="Y"
          await user.save();
          res.send({statusCode:200,message:"Verification Successfull"})
        }
        else
        {
          res.send({statusCode:400,message:"Invalid OTP"})
        }
    }
    else
      res.send({statusCode:400,message:"User Does not exists"})
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


