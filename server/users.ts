const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const sessionStore = require('./passport/store')(expressSession);
const store = new sessionStore({ url: 'mongodb://127.0.0.1/TwitIt' });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSession({
    name: 'twitit',
    secret: 'dariaglinskaya',
    resave: false,
    saveUninitialized: false,
    store: store
}));
router.use(passport.initialize());
router.use(passport.session());
require('./passport/init')(passport);
router.get('loggedin', (req, res) => {
    console.log('logged!!!!!!!!!')
    console.log(req.body);
    res.body('Hi');
    res.status(200).end();
});
router.post('/login', passport.authenticate('login'), (req, res) => {
    if (req.user) {
        console.log(req.user)
        return res.status(200).send(req.user);
    } else {
        return res.sendStatus(401);
    }
});

router.get('/logout', (req, res) => {
    console.log('logout')
    req.session.destroy();
    res.status(200).end();
});

router.get('/isAuthorized', (req, res) => req.user ? res.status(200).send(req.user) : res.sendStatus(401));

module.exports = router;