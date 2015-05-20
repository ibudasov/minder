function main(req, res) {
    res.render('main', {
        title: 'Minder — Dashboard',
        userName: 'sir'//req.session.passport.user.displayName
    });
}

function add(req, res) {
    res.render('add', {
        title: 'Minder — Add Thought'
    });
}

function stats(req, res) {
    res.render('stats', {
        title: 'Minder — Stats'
    });
}

function cloud(req, res) {
    res.render('cloud', {
        title: 'Minder — Cloud of Thoughts'
    });
}

function calendar(req, res) {
    res.render('calendar', {
        title: 'Minder — Calendar'
    });
}

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

function login(req, res) {
    res.render('login', {
        title: 'Minder — Login'
    });
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
