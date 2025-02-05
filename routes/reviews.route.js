const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthorReview } = require('../middlewares/isAuthor');
const reviewController = require('../controllers/reviewsController');


router.post('/place/:placeId/review', isAuth, isValidObjectId('/places'), wrapAsync(reviewController.store));

router.delete('/place/:placeId/review/:reviewId', isAuthorReview, isAuth, isValidObjectId('/places'), wrapAsync(reviewController.deleteReview));

module.exports = router;