function main(req, res) {

    res.render('main', {
        title: 'Minder',
        message: 'main page'
    });
}

module.exports = {
    main: main
};
