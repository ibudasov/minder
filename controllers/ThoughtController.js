var errs = require('./../errorHandler.js');
var config = require('config');
var mongoose = require('mongoose');
var Thought = require('./../models/Thought');
var Q = require('q');

function add(req, res) {
    // convert to lowercase to avoid duplication or selection mismatch
    var thought = req.body.thought.toLowerCase();

    _saveNewThought(thought);

    res.json({
        added: thought
    });
}

function get(req, res) {
    var thoughtsResult = [];

    Thought.getAllThoughts()
        .then(function (foundThoughts) {
            foundThoughts.forEach(function (thought) {
                thoughtsResult.push(thought.itself);
            });
            res.json({
                list: thoughtsResult
            });
        })
        .catch(function (errorMessage) {
            res.json({
                error: errorMessage
            });
        });
}

function getDistinct(req, res) {
    var thoughtsResult = [];

    /**
     * There is no possibility to use distinct with sort, so I've solved problem
     * with aggregation function;
     * @see: http://stackoverflow.com/questions/27968930/sort-and-distinct-in-mongoose
     */
    Thought.aggregate(
        {
            $group: {
                _id: "$itself"
            }
        },
        {$sort: {createdAt: -1}},
        function (err, foundThoughts) {
            if (err) return errs.handle(err);
            foundThoughts.forEach(function (thought) {
                thoughtsResult.push(thought._id);
            });

            res.json({
                list: thoughtsResult
            });
        });
}

function _saveNewThought(thought, callback) {
    // todo: make this code async, refactor
    // todo: enrich Thought object with geo-location, client info, etc
    // todo: check of countToday, and increase if needed
    var newThought = new Thought({
        userId: new mongoose.Types.ObjectId,
        itself: thought
    });
    newThought.save(function (err) {
        if (err) errs.handle(err);
    });
    return newThought;
}

module.exports = {
    api: {
        add: add,
        get: get,
        getDistinct: getDistinct
    }
};
