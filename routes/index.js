var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController.js');
var thoughtController = require('../controllers/ThoughtController.js');
var frontendController = require('../controllers/FrontendController.js');
var statisticController = require('../controllers/StatisticController.js');
var policy = require('../lib/policy.js');
var passport = require('passport');

/**
 * Auth staff
 */
userController.loginWithFacebook();
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/stats',
    failureRedirect: '/'
}));

/**
 *  Frontend routes
 */
router.get('/', frontendController.main);
router.get('/add', frontendController.add);
router.get('/stats', frontendController.stats);
router.get('/cloud', frontendController.cloud);
router.get('/calendar', frontendController.calendar);


/**
 *  API routes
 */
router.post('/thought', thoughtController.api.add);
router.get('/thought', thoughtController.api.get);
router.get('/thought/distinct', thoughtController.api.getDistinct);
router.get('/statistic/top/', statisticController.api.top);
router.get('/statistic/top/:limit([1-9])', statisticController.api.top);

module.exports = router;
