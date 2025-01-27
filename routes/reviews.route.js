const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review');
const Place = require('../models/place');
const isValidObjectId = require('../middlewares/isValidObjectId');


router.post('/place/:id/review', isValidObjectId('/places'), wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    const review = new Review(req.body.review);
    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/place/${place._id}`);
}));

router.delete('/place/:placeId/review/:reviewId', isValidObjectId('/places'), wrapAsync(async (req, res) => {
    const { placeId, reviewId } = req.params;
    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/place/${placeId}`);
}));

module.exports = router;