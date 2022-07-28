const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = new mongoose.Schema({
    name:{type:'string',required:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    mobile:{type:'string',default:'000-000-0000'},
    password:{type:'string',required:true},
    role:{type:"string",default:"student"},
    createdAt:{type:Date,default:Date.now}
})


var foodSchema = new mongoose.Schema({
    name:{type:'string'},
    price:{type:Number},
    descrition:{type:'string'}
})



const UserDetails = mongoose.model('users',userSchema);
const FoodDetails = mongoose.model('foods',foodSchema)
module.exports={UserDetails}