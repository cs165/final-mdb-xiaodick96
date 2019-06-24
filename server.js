const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
async function main() {
  const DATABASE_NAME = 'cs193x-db';
  const MONGO_URL = `mongodb+srv://404410007:<password>@final-project-ex1lc.mongodb.net/test?retryWrites=true&w=majority`;

  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
  
};

main();

async function onGet(req, res) {
  console.log(`Get data!`);
  const day = req.params.day;
  
  var query = { day: day };
  const collection = db.collection('diary');
  const options = {'_id' : -1};
  const result = await collection.find({day:day}).sort({_id:-1}).limit(1).toArray();
  console.log(result);
  console.log(result[0].content);
  const response = {
    day: day,
    content:result[0].content
  };
  console.log(response);
  res.json(response);
}
app.get('/get/:day', onGet);

async function onPost(req, res) {
    console.log("post!");
  const day = req.body.day;
  const content = req.body.content;
  const data = {
      day: day,
      content: content
  }
  console.log(data);
  const collection = db.collection('diary');
  const response = await collection.insertOne(data);
  res.json({response :  content});
}
app.post('/save', jsonParser, onPost);