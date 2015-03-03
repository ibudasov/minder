exports.auth = function (req, res, next) {
    if (req.session && req.session.user && req.session.access_token) {
        next();
    } else {
        res.send('Unauthorized', 401);
    }
};
exports.unme = function (req, res, next) {
    if (req.params.id === 'me') {
        req.params.id = req.session.user.id;
    }
    next();
};
