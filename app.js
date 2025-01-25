const ejsMate = require('ejs-mate');
const express = require('express');
const mongoose = require('mongoose');
const ErrorHandler = require('./utils/ErrorHandler');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

//connect to mongoDB
mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB', err);
    });

//models
const Place = require('./models/place');


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/places', async (req, res) => {
    const places = await Place.find();
    res.render('places/index', { places });
});

app.get('/place/create', (req, res) => {
    res.render('places/create');
});

app.post('/place/store', async (req, res) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect(`/places`);
})

app.get('/place/:id/edit', async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place });
});

app.put('/place/:id/update', async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    res.redirect(`/places`);
});

app.delete('/place/:id/delete', async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places');
})

app.get('/place/:id', async (req, res) => {
    // const { id } = req.params;
    const place = await Place.findById(req.params.id);
    res.render('places/show', { place });
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