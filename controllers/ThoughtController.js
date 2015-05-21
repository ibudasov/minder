var errs = require('./../errorHandler.js');
var Thought = require('./../models/Thought');

function add(req, res) {
    var newThoughtData = {
        // convert to lowercase to avoid duplication or selection mismatch
        itself: req.body.thought.toLowerCase(),
        userId: req.user._id
    };

    Thought.createNewThought(newThoughtData)
        .then(function (thought) {
            res.json({
                added: thought.itself
            });
        })
        .catch(function (err) {
            errs.handle(err, res);
        });
}

function get(req, res) {
    Thought.getAllThoughts()
        .then(function (foundThoughts) {
            res.json({
                list: foundThoughts.map(function (thought) {
                    return thought.itself;
                })
            });
        })
        .catch(function (err) {
            errs.handle(err, res);
        });
}

function getDistinct(req, res) {
    Thought.getAllThoughtsDistinct()
        .then(function (foundThoughts) {
            res.json({
                list: foundThoughts.map(function (thought) {
                    return thought._id;
                })
            });
        })
        .catch(function (err) {
            errs.handle(err, res);
        });
}

module.exports = {
    api: {
        add: add,
        get: get,
        getDistinct: getDistinct
    }
};
