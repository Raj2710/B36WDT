const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const secretKey = `QwertYuioP*&654#$@1bmbNBMB`
const SALTROUNDS = 10

const hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(SALTROUNDS)
    console.log('Salt',salt)
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

const hashCompare = async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}

const createToken = async({email,role,firstName,lastName})=>{
    let token = await jwt.sign(
        {email,role,firstName,lastName},
        process.env.secretKey,
        {expiresIn:'1m'})

        return token
}

const decodeToken = async(token)=>
{
    let data = await jwt.decode(token)
    return data
}

const validate = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(' ')[1]
        let data = await decodeToken(token)
        if(Math.round(Date.now()/1000)<data.exp)
            next()
        else
            res.send({statusCode:400,message:"Token Expired"})
    }
    else
    {
        res.send({statusCode:400,message:"No Token Found"})
    }
}

const adminGaurd = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(' ')[1]
        let data = await decodeToken(token)
        if(data.role==='admin')
            next()
        else
            res.send({statusCode:400,message:"Only Admin Can Access"})
    }
    else
    {
        res.send({statusCode:400,message:"No Token Found"})
    }
}

module.exports={hashPassword,hashCompare,createToken,decodeToken,validate,adminGaurd}