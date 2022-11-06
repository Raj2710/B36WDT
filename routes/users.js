var express = require('express');
var router = express.Router();
const {userModal,mongoose} = require('./../schema/UserSchema')
const {mongodb,dbURL} = require('./../config/dbConfig')
const {hashPassword,hashCompare,createToken,decodeToken,validate,adminGaurd} = require('./../config/auth');
const e = require('express');

mongoose.connect(dbURL)

router.get('/all',validate,adminGaurd,async(req,res)=>{
  try {
    if(req.headers && req.headers.authorization)
    {
      let token = req.headers.authorization.split(' ')[1]
      let decodeValue = await decodeToken(token)
      let user = await userModal.findOne({email:decodeValue.email})
      if(user)
      {
        let users = await userModal.find()
        res.send({statusCode:200,users})
      }
      else
      {
        res.send({statusCode:401,message:"Unauthorized"})
      }
    }
    else
    {
      res.send({statusCode:400,message:"No Token Found"}) 
    }
    
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.post('/signup',async(req,res)=>{
  try {
    let user = await userModal.findOne({email:req.body.email})
    if(!user)
    {
      let hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword
      await userModal.create(req.body)
      res.send({statusCode:200,message:"Signup Successfull"})
    }
    else
      res.send({statusCode:400,message:"User Already Exists"})

  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.post('/signin',async(req,res)=>{
  try {
    let user = await userModal.findOne({email:req.body.email})
    if(user)
    {
      if(await hashCompare(req.body.password,user.password))
      {
        let token = await createToken({
          email:user.email,
          role:user.role,
          firstName:user.firstName,
          lastName:user.lastName
        })
        res.send({statusCode:200,message:"Signin Successfull",token})
      }
      else
      {
        res.send({statusCode:400,message:"Invalid Credentials"})
      }
    }
    else
      res.send({statusCode:400,message:"User Does Not Exists"})

  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

module.exports = router;
