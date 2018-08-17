const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

const User = mongoose.model('user', UserSchema);

module.exports = User;