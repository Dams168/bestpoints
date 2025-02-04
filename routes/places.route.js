const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const Place = require('../models/place');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthorPlace } = require('../middlewares/isAuthor');

router.get('/places', async (req, res) => {
    const places = await Place.find();
    res.render('places/index', { places });
});

router.get('/place/create', isAuth, (req, res) => {
    res.render('places/create');
});

router.post('/place/store', wrapAsync(async (req, res) => {
    const place = new Place(req.body.place);
    await place.save();
    req.flash('success', 'Successfully made a new place!');
    res.redirect(`/places`);
}));

router.get('/place/:id/edit', isAuth, isAuthorPlace, isValidObjectId('/places'), async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place });
});

router.put('/place/:id/update', isAuthorPlace, isValidObjectId('/places'), wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    req.flash('success', 'Successfully updated place!');
    res.redirect(`/place/${req.params.id}`);
}));

router.delete('/place/:id/delete', isAuth, isAuthorPlace, isValidObjectId('/places'), wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted place');
    res.redirect('/places');
}))

router.get('/place/:id', isValidObjectId('/places'), async (req, res) => {
    const place = await Place.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author');

    res.render('places/show', { place });
});


module.exports = router;