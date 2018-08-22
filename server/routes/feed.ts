const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
import tweetModel from '../models/tweetModel';
var mongoDB = 'mongodb://127.0.0.1/TwitIt';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', () => console.log('connected to DB'));

router.get('/feed', function (req, res) {    
    tweetModel.find({}, function (err, doc) {
        res.send(doc)
    });
})
module.exports = router;