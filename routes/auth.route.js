const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        await User.register(user, password);
        req.flash('success', 'Register Success you can Log in!');
        res.redirect('/login');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    failureFlash: {
        type: 'error',
        message: 'Invalid username or password'
    },
    failureRedirect: '/login'
}),
    (req, res) => {
        req.flash('success', 'Welcome back!');
        res.redirect('/places');
    });


module.exports = router;