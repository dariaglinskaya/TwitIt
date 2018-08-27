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
router.post('/like', (req, res) => {
    console.log(req.body);
    feedController.likeTweet(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.status(200).end();
        }
    });
});
router.post('/unlike', (req, res) => {
    feedController.unlikeTweet(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.status(200).end();
        }
    });
})
router.post('/retweet', (req, res) => {
    console.log(req.body);
    feedController.retweetTweet(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.status(200).end();
        }
    });
});
router.post('/unretweet', (req, res) => {
    feedController.unretweetTweet(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.status(200).end();
        }
    });
})
router.post('/addTweet', (req, res) => {
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
router.post('/userpage', (req, res) => {
    console.log(req.body);
    feedController.renderUserTweets(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            console.log(response);
            res.send(response);
            res.status(200).end();
        }
    });
});
router.post('/personal', (req, res) => {
    console.log(req.body);
    feedController.renderUserTweets(req.body).then((response) => {
        feedController.renderRetweets(req.body.admin).then((resp) => {
            const arr = [].concat.apply([], resp);
            const result = arr.concat(response);
            if (!response) {
                res.sendStatus(400);
            } else {
                res.send(result);
                res.status(200).end();
            }
        })

    });
});
module.exports = router;