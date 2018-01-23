module.exports.homelist = (req, res, next) => {
    res.render('locations-list', { title: 'Home' })
};

module.exports.locationInfo = (req, res, next) => {
    res.render('location-info', { title: 'Location Info' })
};

module.exports.addReview = (req, res, next) => {
    res.render('location-review-form', { title: 'Add Review' })
};
