const Place = require('../models/place');

const index = async (req, res) => {
    const places = await Place.find();
    res.render('places/index', { places });
}

const create = (req, res) => {
    res.render('places/create');
}

const store = async (req, res) => {
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));

    const place = new Place(req.body.place);
    place.author = req.user._id;
    place.images = images;
    await place.save();

    req.flash('success', 'Successfully made a new place!');
    res.redirect(`/places`);
}

const update = async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    req.flash('success', 'Successfully updated place!');
    res.redirect(`/places/${req.params.id}`);
}

const edit = async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place });
}

const deletePlace = async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted place');
    res.redirect('/places');
}

const show = async (req, res) => {
    const place = await Place.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author');

    res.render('places/show', { place });
}

module.exports = { index, create, store, update, edit, deletePlace, show };
