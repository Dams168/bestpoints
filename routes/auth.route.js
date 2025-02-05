const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const authController = require('../controllers/authController');

router.route('/register')
    .get(authController.registerForm)
    .post(wrapAsync(authController.register));

router.route('/login')
    .get(authController.loginForm)
    .post(passport.authenticate('local', {
        failureFlash: {
            type: 'error',
            message: 'Invalid username or password'
        },
        failureRedirect: '/login'
    }), authController.login);

router.post('/logout', authController.logout);


module.exports = router;