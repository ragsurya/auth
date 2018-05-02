const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//On Save Hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err) { return next(err);}

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) { return next(err);}
            user.password = hash;
            //hook finish, now go ahead and save the model
            next();
        });
    });
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function( err, isMatch){
        if(err) { callback(err); }
        callback(null, isMatch);
    })
}
//Create the model class
const ModelClass = mongoose.model('validUser', userSchema);

//Export the model
module.exports = ModelClass;