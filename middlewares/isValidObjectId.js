const mongoose = require('mongoose');

module.exports = (redirectUrl = '/') => {
    return async (req, res, next) => {
        const paramId = ['id', 'placeId', 'reviewId'].find(param => req.params[param]);

        if (!paramId) {
            return next();
        }

        const id = req.params[paramId];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid ID / data not found');
            return res.redirect(redirectUrl);
        }

        next();
    }
}