var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController.js');
var thoughtController = require('../controllers/ThoughtController.js');
var pageController = require('../controllers/PageController.js');
var statisticController = require('../controllers/StatisticController.js');
var acl = require('../lib/acl.js');
var passport = require('passport');

/**
 * Auth staff
 */
userController.loginWithFacebook();
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook',
    { scope: [ 'email'] }
));
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
router.get('/', pageController.main);
router.get('/login', pageController.login);
router.get('/logout', pageController.logout);
router.get('/add', acl.checkPageAuth, pageController.add);
router.get('/stats', acl.checkPageAuth, pageController.stats);
router.get('/cloud', acl.checkPageAuth, pageController.cloud);
router.get('/calendar', acl.checkPageAuth, pageController.calendar);

/**
 *  API routes
 */
router.post('/thought', acl.checkApiAuth, thoughtController.api.add);
router.get('/thought', acl.checkApiAuth, thoughtController.api.get);
router.get('/thought/distinct', acl.checkApiAuth, thoughtController.api.getDistinct);
router.get('/statistic/top/', acl.checkApiAuth, statisticController.api.top);
router.get('/statistic/top/:limit([1-9])', acl.checkApiAuth, statisticController.api.top);

module.exports = router;
