var errs = require('./../errorHandler.js');
var Thought = require('./../models/Thought');
var moment = require('moment');

/**
 * Returns aggregated distincted thoughts with their count
 * @see http://docs.mongodb.org/manual/core/aggregation-introduction/
 * @param req
 * @param res
 */
function top(req, res) {
    var limit = ((parseInt(req.params.limit) > 0) ? parseInt(req.params.limit) : 5),
        currentDate = moment().toISOString(),
        monthAgoDate = moment().subtract(1, 'month').toISOString();

    Thought.aggregate(
        {
            $match: {
                'createdAt': {
                    $gte: new Date(monthAgoDate),
                    $lt: new Date(currentDate)
                }
            }
        },
        {
            $group: {
                _id: "$itself",
                numberOfEntries: {$sum: '$countToday'}
            }
        },
        {$sort: {numberOfEntries: -1}},
        {$limit: limit},
        function (err, result) {
            if (err) return errs.handle(err);
            res.json({
                topThoughts: result
            });
        });
}

module.exports = {
    api: {
        top: top
    }
};
