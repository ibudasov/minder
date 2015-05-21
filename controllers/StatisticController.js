var errs = require('./../errorHandler.js');
var Thought = require('./../models/Thought');

/**
 * Returns aggregated distincted thoughts with their count
 * @see http://docs.mongodb.org/manual/core/aggregation-introduction/
 * @param req
 * @param res
 */
function top(req, res) {
    Thought.getTopThoughts(req)
        .then(function (result) {
            res.json({
                topThoughts: result
            });
        })
        .catch(function (err) {
            errs.handle(err, res);
        });
}

module.exports = {
    api: {
        top: top
    }
};
