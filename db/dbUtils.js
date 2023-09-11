const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gcttirth:123123qweqwe@cluster0.negsqr9.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db;
async function connectToDB() {
    let mongoClient;
    try {
        await client.connect();
        db = client.db();
        console.log("DB Connected successfully");
    } catch(error) {
        console.error("Connection failed! ", error);
        process.exit();
    } finally {
        console.log("Process over");
    }
}
async function insertOne(collectionName, data) {
    return await db.collection(collectionName).insertOne(data);
}
async function findOne(collectionName, query) {
    return await db.collection(collectionName).findOne(query);
}
async function updateOne(collectionName, query) {
    return await db.collection(collectionName).updateOne(query);
}

exports.dbOperations = {
    connectToDB,
    insertOne,
    findOne,
    updateOne
}