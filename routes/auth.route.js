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
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'Success registered and logged in!');
            res.redirect('/places');
        });
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

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You are logged out!');
        res.redirect('/places');
    });
});


module.exports = router;