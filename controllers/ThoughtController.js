var errs = require('./../errorHandler.js');
var config = require('config');

function add(req, res) {
    res.json({
        status: "ok",
        added: "test thought"
    });
}

function get(req, res) {
    res.json({
        status: "ok",
        list: []
    });
}

module.exports = {
    api: {
        add: add,
        get: get
    }
};
