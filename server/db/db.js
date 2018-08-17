const mongoose = require('mongoose');
const tweetModel = require('../models/tweetModel').tweetModel;

var mongoDB = 'mongodb://127.0.0.1/TwitIt';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

tweetModel.find({countLikes: 90}, function (err, doc) {
    console.log(doc)
})

db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', () => console.log('connected to DB'));
