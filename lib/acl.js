var User = require('./../models/User.js');

exports.requireAuth = function (req, res, next) {
    if (req.session.passport.user && req.session.passport.user.id) {
        User.findById(req.session.passport.user.id)
            .then(function (user) {
                req.user = user;
                next();
            })
            .fail(function (err) {
                res.redirect('/login');
            });
    } else {
        res.redirect('/login');
    }
};

exports.unme = function (req, res, next) {
    if (req.params.id === 'me') {
        req.params.id = req.user.id;
    }
    next();
};
