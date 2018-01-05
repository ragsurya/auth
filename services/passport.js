import passport from 'passport';
import User from '../server/models/user';
import config from '../server/config';
import passportJwt from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions , function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
        if(err) { return done(err);}
        if(!user) { return done(null); }

        user.comparePassword(password, function(err, isMatch){
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); }
            return done(null, user);
        })
    });

});


const JwtOptions ={
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtlogin = new JwtStrategy(JwtOptions, function(payload, done){

    User.findById(payload.sub, function(err, user){
        if(err){ return done(err, false); }
        
        if(user){
            done(null, user);
        }
        else{
            done(null, false);
        }
    });
});

passport.use(jwtlogin);
passport.use(localLogin);

