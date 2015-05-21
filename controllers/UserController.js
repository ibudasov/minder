var errs = require('./../errorHandler.js');
var config = require('config');
var mongoose = require('mongoose');
var User = require('./../models/User');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
            User.findOrCreate(profile)
                .then(done.bind(null, null)) // = done(null, User);
                .catch(done); // = done(err);
        }
    ));

    /**
     * Serialize-deserialize routines
     * @see: http://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session
     */
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        User.findById(user.id)
            .then(done.bind(null, null)) // = done(null, User);
            .catch(done); // = done(err);
    });
}

function loginWithGoogle(req, res) {

    /**
     * Basic strategy implementation
     * @see: http://passportjs.org/guide/facebook/
     */
    passport.use(new GoogleStrategy({
            clientID: config.get('GOOGLE_CLIENT_ID'),
            clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: config.get('GOOGLE_CALLBACK_URL')
        },
        function(accessToken, refreshToken, profile, done) {
            profile.accessToken = accessToken;
            User.findOrCreate(profile)
                .then(done.bind(null, null)) // = done(null, User);
                .catch(done); // = done(err);
        }
    ));

    /**
     * Serialize-deserialize routines
     * @see: http://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session
     */
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        User.findById(user.id)
            .then(done.bind(null, null)) // = done(null, User);
            .catch(done); // = done(err);
    });
}

module.exports = {
    loginWithFacebook: loginWithFacebook,
    loginWithGoogle: loginWithGoogle
};
