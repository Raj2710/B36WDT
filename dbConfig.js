const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'b36wdt'
const dbUrl = `mongodb+srv://Raj2710:Raj2710@raj.x3e0h.mongodb.net/${dbName}`
module.exports ={dbName,dbUrl,mongodb,MongoClient};