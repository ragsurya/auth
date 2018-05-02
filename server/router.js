const Authentication = require('./controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const health = require('./controllers/health');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports = (app) => {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Super secret code is ABC123'});
    });
    app.get('/ping', health.ping);
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/userdetails', requireSignin, Authentication.getUserDetails);
}