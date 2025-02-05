const Review = require('../models/review');
const Place = require('../models/place');

const store = async (req, res) => {
    const { placeId } = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();

    const place = await Place.findById(placeId);
    place.reviews.push(review);
    await place.save();

    req.flash('success', 'Created new review!');
    res.redirect(`/place/${place._id}`);
}

const deleteReview = async (req, res) => {
    const { placeId, reviewId } = req.params;
    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/place/${placeId}`);
}

module.exports = { store, deleteReview };