var express = require('express');
var router = express.Router();
var thoughtController = require('../controllers/ThoughtController.js');
//var policy = require('../lib/policy.js');

/* GET home page. */
router.get('/', function(req, res, next) {res.render('index', { title: 'Express' });});

router.post('/thought',       thoughtController.api.add);
router.get('/thought',        thoughtController.api.get);

module.exports = router;
