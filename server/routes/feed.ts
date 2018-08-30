const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const sessionStore = require('../passport/store')(expressSession);
const store = new sessionStore({ url: 'mongodb://dariaglinskaya:6972675Dasha@ds235352.mlab.com:35352/twitit' });
import feedController from '../controllers/feedController';
var mongoDB = 'mongodb://dariaglinskaya:6972675Dasha@ds235352.mlab.com:35352/twitit';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', () => console.log('connected to DB'));
router.use(expressSession({
    name: 'login',
    secret: 'dariaglinskaya',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 3600000 },
}));
router.use(passport.initialize());
router.use(passport.session());

require('../passport/init')(passport);

function login(user) {
    const userFound = passport.authenticate('login');
    console.log(userFound);
    return new Promise((resolve, reject) => {
        if (userFound) {
            resolve(userFound);
        } else {
            reject();
        }
    });
};
/*
router.post('/', (request, response) => {
    login(request.user).then((res) => {
        console.log(request.user)
        if (!request.user) {
            response.sendStatus(401);
        } else {
            console.log('true')
            response.send(request.user);
            response.status(200).end();
        }
    })});*/

router.post('/', passport.authenticate('login'), (req, res) => {
    console.log(req.user)
    if (!req.user) {
        res.sendStatus(401);

    } else {
        console.log('true')
        //res.send(req.user);
        res.status(200).end();
    }
});

router.post('/feed', (req, res) => {
    console.log(req.body)
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
    console.log(req.body)
    feedController.renderUserTweets(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.send(response);
            res.status(200).end();
        }
    });
});
router.post('/personal', (req, res) => {
    console.log(req.body)
    feedController.renderUserTweets(req.body).then((response) => {
        if (req.body.admin.retweets.length) {
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
        } else {
            console.log(1)
            res.send(response);
            res.status(200).end();
        }
    })
        .catch(() => {
            res.sendStatus(400);
        });
});
module.exports = router;