var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Q = require('q');
var _ = require('lodash');
var moment = require('moment');

var userSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    accessToken: String,
    username: {type: String, unique: true},
    displayName: {type: String},
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    gender: String,
    profileUrl: String,
    lastLoginAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

userSchema.statics = {
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
                deferred.reject('User not found');
            }
        });
        return deferred.promise;
    }
};


var User = mongoose.model('User', userSchema);

module.exports = User;
