const mongoose = require('mongoose');

const Schema = mongoose.Schema

const placeSchema = new Schema({
    title: String,
    description: String,
    location: String,
    price: String,
    image: String
});

module.exports = mongoose.model('Place', placeSchema);