const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const Place = require('../models/place');
const { placeSchema } = require('../schemas/place');

router.get('/places', async (req, res) => {
    const places = await Place.find();
    res.render('places/index', { places });
});

router.get('/place/create', (req, res) => {
    res.render('places/create');
});

router.post('/place/store', async (req, res) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect(`/places`);
})

router.get('/place/:id/edit', async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place });
});

router.put('/place/:id/update', async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    res.redirect(`/places`);
});

router.delete('/place/:id/delete', async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places');
})

router.get('/place/:id', async (req, res) => {
    // const { id } = req.params;
    const place = await Place.findById(req.params.id).populate('reviews');
    res.render('places/show', { place });
});


module.exports = router;