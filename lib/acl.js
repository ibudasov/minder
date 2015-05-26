var User = require('./../models/User.js');

var getTokenFromRequest = function(req, res) {
    var calculatedToken;
    switch (true) {
        case Boolean(req.query && req.query.accessToken):
            calculatedToken = req.query.accessToken;
            break;
        case Boolean(req.body && req.body.accessToken):
            calculatedToken = req.body.accessToken;
            break;
        case Boolean(req.user && req.user.accessToken):
            calculatedToken = req.user.accessToken;
            break;
        default:
            res.status(401).send('accessToken not found');
            break;
    }
    return calculatedToken;
};

exports.checkPageAuth = function (req, res, next) {
    if (!req.session.passport.user || !req.session.passport.user.id) {
        res.status(302).redirect('/login');
        return;
    }

    User.findById(req.session.passport.user.id)
        .then(function (user) {
            req.user = user;
            next();
        })
        .fail(function (err) {
            res.status(302).redirect('/login');
            return;
        });
};

exports.checkApiAuth = function (req, res, next) {
    User.findByAccessToken(getTokenFromRequest(req, res))
        .then(function (user) {
            req.user = user;
            next();
        })
        .fail(function (err) {
            res.status(401).send(err);
            return;
        });
};
