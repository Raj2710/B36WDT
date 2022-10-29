const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SALTROUNDS = 10
const secretKey = 'JKjksdkjsbk718sjbd'

const hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(SALTROUNDS);
    return await bcrypt.hash(password,salt)
}

const hashCompare = async(password,hashedPassword)=>{
    return await bcrypt.compareSync(password,hashedPassword)
}

const createToken = async({email,role,firstName,lastName})=>{
    let token = await jwt.sign({email,role,firstName,lastName},secretKey,{expiresIn:'1m'})
    return token
}

const decodeToken = async(token)=>{
    return await jwt.decode(token)
}

//middlewares
const validate = async(req,res,next)=>{
if(req.headers && req.headers.authorization)
{   
    let token = req.headers.authorization.split(" ")[1]
    let decode = await decodeToken(token)
    if((Math.round(Date.now()/1000))<= decode.exp)
        next()
    else
        res.send({statusCode:400,message:"Token Expired"})
}
else
    res.send({statusCode:400,message:"Token Missing"})
}

const roleAdmin = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {   
        let token = req.headers.authorization.split(" ")[1]
        let decode = await decodeToken(token)
        if(decode.role==='admin')
            next()
        else
            res.send({statusCode:400,message:"Only Admin can access!"})
    }
    else
        res.send({statusCode:400,message:"Token Missing"})
}

module.exports = {hashPassword,hashCompare,createToken,decodeToken,validate,roleAdmin}