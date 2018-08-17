const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TweetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date: {
        type: Date, 
        default: Date.now
    },
    author: String,
    text: String,
    countLikes: {
        type: Number, 
        default: 0
    },
    countRetweets: {
        type: Number, 
        default: 0
    },
    });
const Tweet = mongoose.model('tweets', TweetSchema);

module.exports.tweetModel = Tweet;