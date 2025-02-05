const User = require('../models/user');

const registerForm = (req, res) => {
    res.render('auth/register');
}

const register = async (req, res) => {
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
}

const loginForm = (req, res) => {
    res.render('auth/login');
}

const login = (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/places');
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You are logged out!');
        res.redirect('/places');
    });
}

module.exports = { register, login, logout, registerForm, loginForm };