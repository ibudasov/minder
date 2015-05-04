var User = require('./../models/User.js');

exports.auth = function (req, res, next) {
    if (req.session && req.session.userId) {
        User.findById(req.session.userId)
            .then(function (user) {
                req.user = user;
                next();
            })
            .fail(function (err) {
                res.send('Unauthorized', 401);
            });
    } else {
        res.send('Unauthorized', 401);
    }
};

exports.unme = function (req, res, next) {
    if (req.params.id === 'me') {
        req.params.id = req.user.id;
    }
    next();
};
