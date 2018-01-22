module.exports.homelist = (req, res, next) => {
    res.render('locations-list', { title: 'Home' })
};

module.exports.locationInfo = (req, res, next) => {
    res.render('index', { title: 'Location Info' })
};

module.exports.addReview = (req, res, next) => {
    res.render('index', { title: 'Add Review' })
};
