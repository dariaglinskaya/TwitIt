const LocalStrategy = require('passport-local').Strategy;
import userModel from '../models/userModel';

const onLogin = (passport) => {
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        (req, username, password, done) => {
            userModel.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log('nothing found')
                    return done(err);
                }
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(err, false, { message: 'user not found.' });
                }
                if (password !== user.password) {
                    console.log('Invalid Password');
                    return done(err, false, { message: 'incorrect password.' });
                }
                done(null, user);
            });
        }));
};
export default onLogin;