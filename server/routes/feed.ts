const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
import feedController from '../controllers/feedController';
var mongoDB = 'mongodb://127.0.0.1/TwitIt';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', () => console.log('connected to DB'));

router.post('/feed', (req, res) => {
    feedController.getFeed(req.body).then((response) => {
        const arr = [].concat.apply([], response);
        res.send(arr)
    });
})
router.post('/search', (req, res) => {
    feedController.getUsers(req.body).then((response) => {
        res.send(response)
    });
})
router.post('/addTweet', (req,res)=>{
    console.log(req.body);
    feedController.addTweet(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.send(req.body);
            res.status(200).end();
        }
    });
})
module.exports = router;