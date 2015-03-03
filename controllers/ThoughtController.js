var errs = require('./../errorHandler.js');
var config = require('config');
var mongoose = require('mongoose');
var Thought = require('./../models/Thought');

function add(req, res) {

    var newThought = new Thought({
        userId: new mongoose.Types.ObjectId,
        itself: req.body.thought
    });

    newThought.save(function (err) {
        if (err) throw err;
    });

    res.json({
        status: "ok",
        added: req.body.thought
    });
}

function get(req, res) {
    res.json({
        status: "ok",
        list: []
    });
}

module.exports = {
    api: {
        add: add,
        get: get
    }
};
