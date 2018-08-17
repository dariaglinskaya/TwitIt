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
    countLikes: Number,
    countRetweets: Number,
    });
const Tweet = mongoose.model('tweets', TweetSchema);

module.exports.tweetModel = Tweet;