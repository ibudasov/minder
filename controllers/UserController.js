var errs = require('./../errorHandler.js');
var config = require('config');
var mongoose = require('mongoose');
var User = require('./../models/User');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

function loginWithFacebook(req, res) {

    /**
     * Basic strategy implementation
     * @see: http://passportjs.org/guide/facebook/
     */
    passport.use(new FacebookStrategy({
            clientID: config.get('FB_CLIENT_ID'),
            clientSecret: config.get('FB_CLIENT_SECRET'),
            callbackURL: config.get('FB_CALLBACK_URL')
        },
        function (accessToken, refreshToken, profile, done) {
            profile.accessToken = accessToken;
            User.findOrCreate(profile);
            done(null, profile);
        }
    ));

    /**
     * Serialize-deserialize routines
     * @see: http://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session
     */
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports = {
    loginWithFacebook: loginWithFacebook
};
