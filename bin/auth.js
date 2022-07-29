var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const secretKey = "QwerTYUiop799654lKjhhagdfa"
const saltRound = 10;


const hashPassword = async (password)=>{
    var salt = await bcrypt.genSalt(saltRound);
    // console.log("Salt",salt);
    return await bcrypt.hash(password,salt) 
}

const hashCompare = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}


const createToken = async ({email,mobile,role})=>{
    let token = await jwt.sign({email,mobile,role},secretKey,{expiresIn:'1m'})
    console.log(token);
    return token   
}

const decodeToken = async(token)=>{
    let data = await jwt.decode(token)
    let currectTime = +new Date
    if(Math.round(currectTime/1000)<data.exp)
        return {
            email:data.email,
            role:data.role,
            validity:true
        }
    else
        return {
            validity:false
        }
}


module.exports ={hashPassword,hashCompare,createToken,decodeToken}