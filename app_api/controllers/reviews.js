const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const utils = require('./utils');

const doSetAverageRating = location => {
    if (!location) {
        return res.status(404).json({ "message": "Location not found" });
    }
    const avgRating = location.reviews.map(o => o.rating).reduce((acc, val) => acc + val) / location.reviews.length;
    location.rating = avgRating;
    location.save((err, location) => {
        if (err) return utils.customError(err, res);
        return console.log(`Average Rating of Location ${location._id} updated`);
    })
}

const doAddReview = (req, res, next, location) => {
    if (!location) return res.status(404).json({ "message": "Location not found" });
    if (!req.body.author || !req.body.rating || !req.body.reviewText) {
        return res.status(404).json({ "message": "author, rating and reviewText are needed in request body" });
    }

    location.reviews.push({
        author: req.body.author,
        rating: parseFloat(req.body.rating),
        reviewText: req.body.reviewText
    })
    location.save((err, location) => {
        if (err) {
            return utils.customError(err, res)
        }
        doSetAverageRating(location)
        const thisReview = location.reviews[location.reviews.length - 1]
        return res.status(201).json(thisReview)
    })
}

const reviewsCreate = (req, res, next) => {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).exec((err, location) => {
            if (err) return utils.customError(err, res);
            doAddReview(req, res, next, location);
        })
    } else {
        res.status(404).json({ "message": "No location id in request" });
    }
};

const reviewsReadOne = (req, res, next) => {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc.findById(req.params.locationid).select('name reviews').exec((err, location) => {
            if (err) return utils.customError(err, res);
            if (!location) return res.status(404).json({ "message": "Location not found" });
            if ((location && !location.reviews) || (location && location.reviews.length <= 0)) {
                return res.status(404).json({ "message": "Reviews of this Location id not found" });
            }

            const review = location.reviews.id(req.params.reviewid)
            if (!review) return res.status(404).json({ "message": "Review not found" });
            res.status(200).json({ location: { name: location.name, _id: location._id }, review })
        })
    } else {
        res.status(404).json({ "message": "No location id / review id in request" });
    }
};

const reviewsUpdateOne = (req, res, next) => {
    Loc.findById(req.params.locationid).select('reviews').exec((err, location) => {
        if (err) return utils.customError(err, res);
        if (!location) return res.status(404).json({ "message": "Location not found" });
        if ((location && !location.reviews) || (location && location.reviews.length <= 0)) {
            return res.status(404).json({ "message": "Reviews of this Location id not found" });
        }

        let thisReview = location.reviews.id(req.params.reviewid)
        if (!thisReview) return res.status(404).json({ "message": "Review not found" });
        if (req.body.author) thisReview.author = req.body.author;
        if (req.body.rating) thisReview.rating = req.body.rating;
        if (req.body.reviewText) thisReview.reviewText = req.body.reviewText;
        location.save((err, location) => {
            if (err) return utils.customError(err, res);
            doSetAverageRating(location);
            return res.status(200).json(location.reviews[location.reviews.length - 1])
        })
    })
};

const reviewsDeleteOne = (req, res, next) => {
    if (!req.params.locationid || !req.params.reviewid) return res.status(404).json({ "message": "Both locationid and reviewid are required in url" })

    Loc.findById(req.params.locationid).select('reviews').exec((err, location) => {
        if (err) return utils.customError(err, res);
        if (!location) return res.status(404).json({ "message": "Location not found" });
        if ((location && !location.reviews) || (location && location.reviews.length <= 0)) {
            return res.status(404).json({ "message": "Reviews of this Location id not found" });
        }
        if (!location.reviews.id(req.params.reviewid)) return res.status(404).json({ "message": "Review not found" });

        location.reviews.id(req.params.reviewid).remove();
        location.save((err, location) => {
            if (err) return utils.customError(err, res);
            doSetAverageRating(location);
            return res.status(200).json({ "message": `Review ${req.params.reviewid} deleted` })
        })
    })
};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};
