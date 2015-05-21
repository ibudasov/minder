var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Q = require('q');

var ThoughtSchema = new mongoose.Schema({
    userId: ObjectId,
    createdAt: {type: Date, default: Date.now},
    itself: {type: String, min: 18, max: 65},
    countToday: {type: Number, default: 1}
});

ThoughtSchema.statics = {
    getAllThoughts: function () {
        var deferred = Q.defer();
        this.find()
            .sort({'createdAt': -1})
            .exec(function (err, foundThoughts) {
                if (err) {
                    deferred.reject(err);
                    return;
                }
                if (foundThoughts) {
                    deferred.resolve(foundThoughts);
                } else {
                    deferred.reject('No thoughts found');
                }
            });
        return deferred.promise;
    },
    getAllThoughtsDistinct: function () {
        var deferred = Q.defer();
        /**
         * There is no possibility to use distinct with sort, so I've solved problem
         * with aggregation function;
         * @see: http://stackoverflow.com/questions/27968930/sort-and-distinct-in-mongoose
         */
        this.aggregate(
            {
                $group: {
                    _id: "$itself"
                }
            },
            {$sort: {createdAt: -1}},
            function (err, foundThoughts) {
                if (err) {
                    deferred.reject(err);
                    return;
                }
                if (foundThoughts) {
                    deferred.resolve(foundThoughts);
                } else {
                    deferred.reject('No thoughts found');
                }
            });
        return deferred.promise;
    },
    getDummy: function () {
        var deferred = Q.defer();
        return deferred.promise;
    }
};

var Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
