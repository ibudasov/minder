var express = require('express');
var router = express.Router();
var thoughtController = require('../controllers/ThoughtController.js');
var frontendController = require('../controllers/FrontendController.js');
var statisticController = require('../controllers/StatisticController.js');

/* Frontend routes */
router.get('/', frontendController.main);
router.get('/add', frontendController.add);
router.get('/stats', frontendController.stats);
router.get('/cloud', frontendController.cloud);
router.get('/calendar', frontendController.calendar);

/* API routes */
router.post('/thought', thoughtController.api.add);
router.get('/thought', thoughtController.api.get);
router.get('/thought/distinct', thoughtController.api.getDistinct);

router.get('/statistic/top/', statisticController.api.top);
router.get('/statistic/top/:limit([1-9])', statisticController.api.top);

module.exports = router;
