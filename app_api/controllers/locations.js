const mongoose = require('mongoose');
const Loc = mongoose.model('Location');


const locationsListByDistance = (req, res, next) => {
    const lng = parseFloat(req.query.lng)
    const lat = parseFloat(req.query.lat)
    if ((!lng && lng != 0) || (!lat && lat != 0)) {
        return res.status(404).json({ "message": "Lng & Lat required in url query" })
    }
    const point = {
        type: "Point",
        coordinates: [ lng, lat ]
    }
    const geoOptions = {
        near: point,
        spherical: true,
        maxDistance: 1000,
        distanceField: "dist.calculated",
        num: 5
    }
    Loc.aggregate([{ $geoNear: geoOptions }], (err, results, stats) => {
        if (err) {
            console.log("\nERROR\n", err);
            return res.status(404).json({ "message": "Sorry, internal error" })
        }
        console.log("\n results \n", results);
        const locations = results.map(o => {
            return {
                distance: o.dist,
                name: o.name,
                address: o.address,
                rating: o.rating,
                facilities: o.facilities,
                _id: o._id
            }
        })
        return res.status(200).json(locations)
    })
};

const locationsCreate = (req, res, next) => {
    console.log(req.body);
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        rating: req.body.rating,
        facilities: req.body.facilities.split(","),
        coords: [ parseFloat(req.body.lng), parseFloat(req.body.lat) ],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2,
        }],
    }, (err, location) => {
        if (err) {
            console.log("\nERROR\n", err);
            if (err.name == "ValidationError") {
                return res.status(404).json({ "message": err.message })
            } else {
                return res.status(404).json({ "message": "Sorry, internal error" })
            }
        }
        return res.status(200).json(location)
    })
};

const locationsReadOne = (req, res, next) => {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).exec((err, location) => {
            if (err) {
                console.log("\nERROR\n", err);
                res.status(404).json({ "message": "Sorry, we have an internal error at the moment, working on it." })
                return;
            }
            if (!location) {
                res.status(404).json({ "message": "Location id not found" })
                return;
            }
            res.status(200).json(location);
            return;
        })
    } else {
        res.status(404).json({ "message": "No location id in request" });
    }
};

const locationsUpdateOne = (req, res, next) => {

};

const locationsDeleteOne = (req, res, next) => {

};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};
