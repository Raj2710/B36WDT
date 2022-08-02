const mongodb = require('mongodb');
require('dotenv').config()
const MongoClient = mongodb.MongoClient;
const dbUrl = `mongodb+srv://Raj2710:Raj2710@raj.x3e0h.mongodb.net/${process.env.MONGODB_DB_NAME}`
const dbName = process.env.MONGODB_DB_NAME
module.exports ={dbName,dbUrl,mongodb,MongoClient};