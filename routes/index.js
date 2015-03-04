var express = require('express');
var router = express.Router();
var thoughtController = require('../controllers/ThoughtController.js');
var frontendController = require('../controllers/FrontendController.js');

/* GET home page. */
router.get('/',                 frontendController.main);

router.post('/thought',         thoughtController.api.add);
router.get('/thought',          thoughtController.api.get);

module.exports = router;
