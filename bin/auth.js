var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const hashPassword = async (password)=>{
    var salt = await bcrypt.genSalt(process.env.saltRound);
    // console.log("Salt",salt);
    return await bcrypt.hash(password,salt) 
}

const hashCompare = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}


const createToken = async ({email,mobile,role})=>{
    console.log(process.env.expiresIn)
    let token = await jwt.sign({email,mobile,role},process.env.JWTsecretKey,{expiresIn:process.env.expiresIn})
    return token   
}

const decodeToken = async(token)=>{
    let data = await jwt.decode(token)
    return data
}

const validity = async(req,res,next)=>{
    let token = req.headers.authorization.split(' ')[1];
    let data = await jwt.decode(token)
    if((Math.round(+Date.now()/1000))<=data.exp)
    {
        next()
    }
    else
    {
        res.send({
            statusCode:401,
            message:"Token Expired"
        })
    }
}

const roleAdmin = async(req,res,next)=>{
    let token = req.headers.authorization.split(' ')[1];
    let data = await jwt.decode(token)
    if(data.role=='Admin')
    {
        next()
    }
    else
    {
        res.send({
            statusCode:401,
            message:"Only Admin can access this resource"
        })
    }
}


module.exports ={hashPassword,hashCompare,createToken,decodeToken,validity,roleAdmin}