const router = require('express').Router();
const wrapAsync = require('../utils/wrapAsync');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthorPlace } = require('../middlewares/isAuthor');
const placeController = require('../controllers/placesController');
const upload = require('../configs/multer');

router.get('/places', placeController.index);

router.get('/place/create', isAuth, placeController.create);

router.post('/place/store', isAuth, upload.array('image', 5), wrapAsync(placeController.store));

router.get('/place/:id/edit', isAuth, isAuthorPlace, isValidObjectId('/places'), placeController.edit);

router.put('/place/:id/update', isAuthorPlace, isValidObjectId('/places'), upload.array('image', 5), wrapAsync(placeController.update));

router.delete('/place/:id/delete', isAuth, isAuthorPlace, isValidObjectId('/places'), wrapAsync(placeController.deletePlace));

router.get('/place/:id', isValidObjectId('/places'), placeController.show);


module.exports = router;