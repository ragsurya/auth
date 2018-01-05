import Authentication from './controllers/authentication';
import passportService from '../services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports = (app) => {
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi:'there'});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup)
}