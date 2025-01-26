const ejsMate = require('ejs-mate');
const express = require('express');
const mongoose = require('mongoose');
const ErrorHandler = require('./utils/ErrorHandler');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const placesRoute = require('./routes/places.route');
const reviewsRoute = require('./routes/reviews.route');

//connect to mongoDB
mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB', err);
    });


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', placesRoute);
app.use('/', reviewsRoute);

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) => {
    next(new ErrorHandler(404, 'Page not found'));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});