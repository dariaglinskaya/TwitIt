const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.createConnection('mongodb://localhost:3000');

db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', callback => console.log('connected to DB'));

const tweetModel = new mongoose.Schema({
    author: String,
    date: Date,
    text: String,
    countLikes: Number,
    countRetweets: Number
    
});

const userModel = new mongoose.Schema({
    username: String,
    password: String
});

module.exports.tweetModel = db.model('tweets', tweetModel);
module.exports.userModel = db.model('users', userModel);