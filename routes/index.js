var express = require('express');
var router = express.Router();

var food = []

router.get('/food',(req,res)=>{
    res.send({
        statusCode:200,
        data:food
    })
})

router.get('/food/:id',(req,res)=>{
   if(req.params.id<food.length)
   {
    res.send({
        statusCode:200,
        data:food[req.params.id]
    })
   }
   else
   {
    res.send({
        statusCode:404,
        message:"Item not found"
    })
   }
})

router.post('/add-food',(req,res)=>{

    food.push(req.body)
    res.send({
        statusCode:200,
        message:"Food Added"
    })
})

router.put('/edit-food/:id',(req,res)=>{
    food.splice(req.params.id,1,req.body)
    res.send({
        statusCode:200,
        message:"Food Updated"
    })
})

router.delete('/delete-food/:id',(req,res)=>{
    if(req.params.id<food.length)
    {
        food.splice(req.params.id,1)
         res.send({
            statusCode:200,
            message:"Food Deleted"
        })
    }
    else
    {
        res.send({
            statusCode:404,
            message:"Item not found"
        })
    }
})

module.exports = router;
