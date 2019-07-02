const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done){
            User.findById(jwt_payload.id)
            .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
    })
    .catch(err => console.log(err));
        })
    );
};

// https://stackoverflow.com/questions/51131480/jwtstrategy-requires-a-function-to-retrieve-jwt-from-requests