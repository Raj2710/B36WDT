const mongoose = require('mongoose')
const validator = require('validator')
let userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true, validate:(value)=> {return validator.isEmail(value)}},
    password:{type:String,required:true},
    role:{type:String,default:'user'},
    createdAt:{type:Date, default:Date.now()}
},{versionKey:false})

const userModal = mongoose.model('users',userSchema)

module.exports={userModal,mongoose}