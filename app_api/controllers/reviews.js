const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = (req, res, next) => {

};

const reviewsReadOne = (req, res, next) => {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc.findById(req.params.locationid).select('name reviews').exec((err, location) => {
            if (err) {
                console.log("\n---------- ERROR START ----------\n\n", err, "\n\n---------- ERROR END ----------\n\n");
                res.status(404).json({ "message": "Sorry, we have an internal error at the moment, working on it." })
                return;
            }
            if (!location) {
                res.status(404).json({ "message": "Location id not found" })
                return;
            }
            if ((location && !location.reviews) || (location && location.reviews <= 0)) {
                res.status(404).json({ "message": "Reviews of this Location id not found" })
                return;
            }
            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewid)
                if (!review) {
                    res.status(404).json({ "message": "Review id not found" })
                    return;
                }
                res.status(200).json({ location: { name: location.name, _id: location._id }, review })
            }
        })
    } else {
        res.status(404).json({ "message": "No location id / review id in request" });
    }
};

const reviewsUpdateOne = (req, res, next) => {

};

const reviewsDeleteOne = (req, res, next) => {

};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};
