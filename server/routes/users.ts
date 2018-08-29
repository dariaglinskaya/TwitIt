const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const sessionStore = require('../passport/store')(expressSession);
const store = new sessionStore({ url: 'mongodb://127.0.0.1/TwitIt' });
import authController from '../controllers/authController';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
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

router.get('loggedin', (req, res) => {
    res.status(200).end();
});
router.post('/login', passport.authenticate('login'), (req, res) => {
    console.log(req.user)
    if (req.user) {
        res.send(req.user);
        return res.status(200).end();
    } else {
        return res.sendStatus(401);
    }
});
router.post('/register', (req, res) => {
    authController.register(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            res.send(req.user);
            console.log('successful registration');
            res.status(200).end();
        }
    })
        .catch(() => new Error());
});
router.post('/subscribe', (req, res) => {
    authController.subscribe(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            console.log('successful subscription');
            res.status(200).end();
        }
    })
        .catch(() => new Error());
});
router.post('/unsubscribe', (req, res) => {
    authController.unsubscribe(req.body).then((response) => {
        if (!response) {
            res.sendStatus(400);
        } else {
            console.log('successful subscription');
            res.status(200).end();
        }
    })
        .catch(() => new Error());
});
router.get('/loggedin', (req, res) => req.user ? res.status(200).send(req.user) : res.sendStatus(401));
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).end();
});

router.get('/isAuthorized', (req, res) => req.user ? res.status(200).send(req.user) : res.sendStatus(401));

module.exports = router;