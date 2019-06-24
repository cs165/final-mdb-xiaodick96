const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

// var hashids = new Hashids("owo", 24, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
// var id = hashids.encode(1);
// var numbers = hashids.decode(id);

async function onCreateDiary(req, res) {
  const response = await req.diaries.insertOne({});
  res.json({ id: response.insertedId });
}
router.post('/create', jsonParser, onCreateDiary);

async function onSaveDiary(req, res) {
  const id = req.body.id;
  const date = req.body.date;
  const content = req.body.content;
  
  const query = { diaryID: id, date: date };
  const newEntry = { diaryID: id, date: date, content: content };
  const params = { upsert: true };
  const response = await req.entries.update(query, newEntry, params);
  const updatedId = id;
  
  res.json({ id: updatedId });
}
router.post('/save', jsonParser, onSaveDiary);

async function onLoadDiary(req, res) {
  const id = req.params.id;
  const Y = req.params.Y;
  const M = req.params.M;
  const D = req.params.D;
  const date = Y + '/' + M + '/' + D;
  const query = { diaryID: id, date: date };
  const result = await req.entries.findOne(query);
  res.json(result);
}
router.get('/id/:id/:Y/:M/:D', onLoadDiary);

module.exports = router;