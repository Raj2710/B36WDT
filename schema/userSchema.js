const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{
        type:String,
        lowercase:true,
        required:true,
        validate: (value)=>{
            return validator.isEmail(value)
        }
    },
    password:{type:String,required:true},
    role:{type:String,default:'user'},
    emailVerify:{type:String,default:"N"},
    tempOTP:{type:String,default:null},
    createdAt:{type:String,default:new Date()}
},{collection:'users',versionKey:false})

const userModel = mongoose.model('users',UserSchema)

module.exports = {userModel}