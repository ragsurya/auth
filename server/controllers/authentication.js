import User  from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signin = (req, res, next) => {
    res.json({token: tokenForUser(req.user)});

}
exports.signup = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   if(!email || !password)
   res.status(422).json({error: 'you must provide an email address'})
   User.findOne({email: email}, function(err, existing) {
    if(err) { return next(err)}
    
    if(existing) {
        return res.status(422).send({ error: "Email is in use"});
    }
    const newUser = new User({
        email: email,
        password: password 
    })
    newUser.save((err) => {
        if(err) { return next(err); }

        res.json({ token: tokenForUser(newUser)});
    });
   });
    
} 

