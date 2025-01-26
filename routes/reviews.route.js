const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review');
const Place = require('../models/place');
const { reviewSchema } = require('../schemas/review');

router.post('/place/:id/review', wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    const review = new Review(req.body.review);
    place.reviews.push(review);
    await review.save();
    await place.save();
    res.redirect(`/place/${place._id}`);
}));

router.delete('/place/:placeId/review/:reviewId', wrapAsync(async (req, res) => {
    const { placeId, reviewId } = req.params;
    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/place/${placeId}`);
}));

module.exports = router;