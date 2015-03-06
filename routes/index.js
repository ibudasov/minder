var express = require('express');
var router = express.Router();
var thoughtController = require('../controllers/ThoughtController.js');
var frontendController = require('../controllers/FrontendController.js');

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

module.exports = router;
