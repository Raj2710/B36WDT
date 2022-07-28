var express = require('express');
var router = express.Router();
const {dbName,dbUrl,mongodb,MongoClient} = require('../dbConfig');

const client = new MongoClient(dbUrl);

router.get('/all', async(req, res)=> {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let users = await db.collection('users').find().toArray()
    res.send({
      statusCode: 200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({ 
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
  finally{
    client.close()
  }
});


router.get('/:id', async(req, res)=> {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let users = await db.collection('users').find({_id: mongodb.ObjectId(req.params.id)}).toArray();
    res.send({
      statusCode: 200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({ 
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
  finally{
    client.close()
  }
});

router.post('/add-user', async(req, res)=> {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let users = await db.collection('users').insertOne(req.body);
    res.send({
      statusCode: 200,
      message:"User Added Successfully",
      users
    })
  } catch (error) {
    console.log(error)
    res.send({ 
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
  finally{
    client.close()
  }
});

router.put('/edit-user/:id', async(req, res)=> {
  await client.connect();
  try {
    const db = await client.db(dbName);
    let users = await db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
    res.send({
      statusCode: 200,
      message:"User Edited Successfully",
      users
    })
  } catch (error) {
    console.log(error)
    res.send({ 
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
  finally{
    client.close()
  }
});

router.put('/edit-password/:id',async(req,res)=>{
  await client.connect();
  try {
    let db = await client.db(dbName)
    let pwd = await db.collection('users').find({_id:mongodb.ObjectId(req.params.id)}).toArray();
    if(pwd[0].password===req.body.oldPassword)
    {
        if(req.body.newPassword===req.body.confirmPassword)
        {
            let user = await db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:{password:req.body.newPassword}})
            res.send({statusCode:200,message:"Password Updated Successfully"})
        }
        else{
          res.send({statusCode:400,message:"New and Confirm Password does not match"
          })
        }
    }
    else{
      res.send({
        statusCode:400,
        message:"Old Password does not match"
      })
    }
  } catch (error) {
    console.log(error)
    res.send({ 
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
  finally{
    client.close()
  }
})

router.delete('/delete-user/:id', async(req, res)=> {
  await client.connect();
  try {
    const db = await client.db(dbName);
    await db.collection('users').deleteOne({_id:mongodb.ObjectId(req.params.id)})
    let users = await db.collection('users').find().toArray();
    res.send({
      statusCode: 200,
      message:"User Deleted Successfully",
      users
    })
  } catch (error) {
    console.log(error)
    res.send({ 
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
  finally{
    client.close()
  }
});

module.exports = router;
