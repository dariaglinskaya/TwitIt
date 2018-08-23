import onLogin from './login';

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('logged user: ', user.username);
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('deserializing user:  ', user.username)
        const err = user ? null : new Error('deserializing error');
        done(err, user.username);
    });
    onLogin(passport);
};