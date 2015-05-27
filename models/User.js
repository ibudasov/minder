var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');
var moment = require('moment');
var fakeToken = '1234567890';

// @see: http://passportjs.org/docs/profile
var UserSchema = new mongoose.Schema({
    provider: {type: String},
    id: {type: String, unique: true},
    displayName: {type: String},
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    emails: [{
        value: {type: String},
        type: {type: String}
    }],
    photos: [{
        value: {type: String}
    }],
    accessToken: String,
    gender: String,
    profileUrl: String,
    lastLoginAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

UserSchema.statics = {
    findOrCreate: function (userData) {
        var deferred = Q.defer();
        this.findOne({id: userData.id}, function onUserFind(err, user) {
            if (err) {
                deferred.reject(err);
                return;
            }
            if (user) {
                user = _.assign(user, userData);
                user.lastLoginAt = new Date(moment().toISOString());
                user.save(function (err) {
                    if (err) {
                        deferred.reject(err);
                        return;
                    }
                    deferred.resolve(user);
                });
            } else {
                user = new User(userData);
                user.save(function (err) {
                    if (err) {
                        deferred.reject(err);
                        return;
                    }
                    deferred.resolve(user);
                });
            }
        });
        return deferred.promise;
    },
    findById: function (userId) {
        var deferred = Q.defer();
        this.findOne({id: userId}, function onUserFindById(err, user) {
            if (err) {
                deferred.reject(err);
                return;
            }
            if (user) {
                deferred.resolve(user);
            } else {
                deferred.reject('User with ID = "' + userId + '" not found');
            }
        });
        return deferred.promise;
    },
    findByAccessToken: function (accessToken) {
        var deferred = Q.defer();
        var condition = (accessToken === fakeToken)
            ? {}
            : {accessToken: accessToken};
        this.findOne(condition, function onUserFindByAccessToken(err, user) {
            if (err) {
                deferred.reject(err);
                return;
            }
            if (user) {
                deferred.resolve(user);
            } else {
                deferred.reject('User with accessToken = "' + accessToken + '" not found');
            }
        });
        return deferred.promise;
    }
};


var User = mongoose.model('User', UserSchema);

module.exports = User;
