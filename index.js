const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
const PORT = 8000


var food = []

app.get('/food',(req,res)=>{
    res.send({
        statusCode:200,
        data:food
    })
})

app.get('/food/:id',(req,res)=>{
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

app.post('/add-food',(req,res)=>{

    food.push(req.body)
    res.send({
        statusCode:200,
        message:"Food Added"
    })
})

app.put('/edit-food/:id',(req,res)=>{
    food.splice(req.params.id,1,req.body)
    res.send({
        statusCode:200,
        message:"Food Updated"
    })
})

app.delete('/delete-food/:id',(req,res)=>{
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


app.listen(PORT,()=>console.log("Server is up in port: "+PORT))