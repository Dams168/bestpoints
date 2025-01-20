const express = require('express');
const mongoose = require('mongoose');
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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});