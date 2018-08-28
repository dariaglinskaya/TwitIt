import * as mongoose from 'mongoose';
mongoose.connect('mongodb://dariaglinskaya:6972675Dasha@ds235352.mlab.com:35352/twitit');

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username field is required']
  },
  password: {
    type: String,
    required: [true, 'password field is required']
  },
  retweets: {
    type: [String],
    default: []
  },
  subscriptions: {
    type: [String],
    default: []
  },
});

const userModel = mongoose.model('users', UserSchema);
export default userModel;