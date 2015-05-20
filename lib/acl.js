var User = require('./../models/User.js');

exports.checkPageAuth = function (req, res, next) {
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

exports.checkApiAuth = function (req, res, next) {
    if (req.session.passport.user && req.session.passport.user.id) {
        User.findById(req.session.passport.user.id)
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
