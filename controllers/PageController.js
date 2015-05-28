function main(req, res) {
    if (isUserLoggedIn(req)) {
        res.redirect('/add');
    }
    res.render('main', {
    });
}

function add(req, res) {
    res.render('add', {
        userName: req.session.passport.user.displayName
    });
}

function stats(req, res) {
    res.render('stats', {
    });
}

function cloud(req, res) {
    res.render('cloud', {
    });
}

function calendar(req, res) {
    res.render('calendar', {
    });
}

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

function login(req, res) {
    res.render('login', {
        loggedIn: isUserLoggedIn(req)
    });
}

function isUserLoggedIn(req) {
    return !!(req.session && req.session.passport && req.session.passport.user);
}


module.exports = {
    main: main,
    add: add,
    stats: stats,
    cloud: cloud,
    calendar: calendar,
    login: login,
    logout: logout
};
