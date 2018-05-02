const User  = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
const GetUserDetails = require('../getUserDetails');



async function tokenForUser(user){
    const timestamp = new Date().getTime();
    return await jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
async function signin(req, res, next){
    res.json({token: await tokenForUser(req.user)});
}
exports.signin = signin;
async function getUserDetails (req, res, next){
   var s = await tokenForUser(req.user)
    if(s !== undefined){
        var resp = GetUserDetails(req, res);
       console.log('RESP BODY', resp);
        return resp
       // return (resp.body == 'undefined' ? resp : resp.body.toJSON());
    }
};
exports.getUserDetails = getUserDetails;
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


