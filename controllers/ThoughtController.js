var errs = require('./../errorHandler.js');
var config = require('config');
var mongoose = require('mongoose');
var Thought = require('./../models/Thought');

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
    Thought.find({}, function (err, foundThoughts) {
        if (err) return errs.handle(err);

        foundThoughts.forEach(function(thought) {
            thoughtsResult.push(thought.itself);
        });
        res.json({
            list: thoughtsResult
        });
    });
}

function getDistinct(req, res) {
    var thoughtsResult = [];
    Thought.distinct('itself', {}, function (err, foundThoughts) {
        if (err) return errs.handle(err);

        foundThoughts.forEach(function(thought) {
            thoughtsResult.push(thought);
        });
        res.json({
            list: thoughtsResult
        });
    });
}

function _saveNewThought(thought) {
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
