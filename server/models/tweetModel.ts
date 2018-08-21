import * as mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/TwitIt');
const Schema = mongoose.Schema;
const TweetSchema = new Schema({
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
const tweetModel = mongoose.model('tweets', TweetSchema);
export default tweetModel;