const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
import getFeed from '../controllers/feedController';
var mongoDB = 'mongodb://127.0.0.1/TwitIt';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', () => console.log('connected to DB'));

router.post('/feed', (req, res) => {
    getFeed(req.body).then((response) => {
        const arr = [].concat.apply([], response);
        console.log(arr)
        res.send(arr)
    });
})
module.exports = router;