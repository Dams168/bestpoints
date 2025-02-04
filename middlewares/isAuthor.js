const Place = require('../models/place');
const Review = require('../models/review');

module.exports.isAuthorPlace = async (req, res, next) => {
    const { id } = req.params;
    let place = await Place.findById(id);
    if (!place.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/places`);
    }

    next();
};

module.exports.isAuthorReview = async (req, res, next) => {
    const { placeId, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/place/${placeId}`);
    }

    next();
};