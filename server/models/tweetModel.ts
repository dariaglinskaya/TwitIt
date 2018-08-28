import * as mongoose from 'mongoose';
mongoose.connect('mongodb://dariaglinskaya:6972675Dasha@ds235352.mlab.com:35352/twitit');
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
    liked: {
        type: [Schema.Types.ObjectId] 
    },
    retweeted: {
        type: [Schema.Types.ObjectId] 
    }
    });
const tweetModel = mongoose.model('tweets', TweetSchema);
export default tweetModel;