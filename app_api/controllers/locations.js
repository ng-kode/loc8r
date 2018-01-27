const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const utils = require('./utils');

const locationsListByDistance = (req, res, next) => {
    const lng = parseFloat(req.query.lng)
    const lat = parseFloat(req.query.lat)
    const maxDistance = parseFloat(req.query.maxDistance)
    if ((!lng && lng != 0) || (!lat && lat != 0) || (!maxDistance && maxDistance != 0))  return res.status(404).json({ "message": "lng, lat and maxDistance required in url query" })

    const point = {
        type: "Point",
        coordinates: [ lng, lat ]
    }
    const geoOptions = {
        near: point,
        spherical: true,
        maxDistance,
        distanceField: "dist.calculated",
        num: 5
    }
    Loc.aggregate([{ $geoNear: geoOptions }], (err, results, stats) => {
        if (err) {
            return utils.customError(err, 400, res);
        }
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

const validateLocation = (location, res) => {
    if (location.facilities) {
        try {
            let facilities = location.facilities.split(",")
        } catch (e) {
            return res.status(404).json({ "message": "Invalid facilities format in request body" })
        }
    }

    if (location.lng && isNaN(parseFloat(location.lng))) return res.status(404).json({ "message": "lng should be numeric" })
    if (location.lat && isNaN(parseFloat(location.lat))) return res.status(404).json({ "message": "lat should be numeric" })
}

const locationsCreate = (req, res, next) => {
    const reqKeys = Object.keys(req.body);
    const locationKeys = [
                            "name",
                            "address",
                            "facilities",
                            "lng",
                            "lat",
                            "days1",
                            "closed1",
                            "days2",
                            "closed2"
                        ]
    const missingKeys = locationKeys.filter(v => !reqKeys.includes(v))
    if (missingKeys.length > 0) return res.status(404).json({ "message": `${missingKeys.join(", ")} are missing in the request body` })

    validateLocation(req.body, res);

    Loc.create({
        name: req.body.name,
        address: req.body.address,
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
            return utils.customError(err, 400, res);
        }
        return res.status(201).json(location)
    })
};

const locationsReadOne = (req, res, next) => {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).exec((err, location) => {
            if (err) return utils.customError(err, 400, res);
            if (!location) return res.status(404).json({ "message": "Location id not found" });

            return res.status(200).json(location);
        })
    } else {
        res.status(404).json({ "message": "No location id in request" });
    }
};

const locationsUpdateOne = (req, res, next) => {
    validateLocation(req.body, res)

    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).select('-review -rating').exec((err, location) => {
            if (err) return utils.customError(err, 400, res);
            if (!location) return res.status(404).json({ "message": "Location id not found" });

            if (req.body.name) location.name = req.body.name;
            if (req.body.address) location.address = req.body.address;
            if (req.body.facilities) location.facilities = facilities;
            if (req.body.lng) location.coords[0] = parseFloat(req.body.lng);
            if (req.body.lat) location.coords[1] = parseFloat(req.body.lat);
            let openingTimes = []
            if (req.body.days1 && req.body.closed1) {
                let obj = {
                    days: req.body.days1,
                    closed: req.body.closed1
                }
                if (req.body.opening1) obj.opening = req.body.opening1;
                if (req.body.closing1) obj.closing = req.body.closing1;
                openingTimes.push(obj);
            }
            if (req.body.days2 && req.body.closed2) {
                let obj = {
                    days: req.body.days2,
                    closed: req.body.closed2
                }
                if (req.body.opening2) obj.opening = req.body.opening2;
                if (req.body.closing2) obj.closing = req.body.closing2;
                openingTimes.push(obj);
            }
            if (openingTimes.length > 0) location.openingTimes =  openingTimes;

            // commiting changes to database
            location.save((err, location) => {
                if (err) return utils.customError(err, res);
                return res.status(200).json(location);
            })
        })
    } else {
        res.status(404).json({ "message": "locationid is required in url" });
    }
};

const locationsDeleteOne = (req, res, next) => {
    if (!req.params.locationid) return res.status(404).json({ "message": "location id is required in url" })

    Loc.findById(req.params.locationid).exec((err, location) => {
        if (err) return utils.customError(err, 400, res);
        if (!location) return res.status(404).json({ "message": "location not found" })

        location.remove((err, location) => {
            if (err) return utils.customError(err, 400, res);
            res.status(204).json(null); // can also do status 204 to give a no-content response
        })
    })
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};
