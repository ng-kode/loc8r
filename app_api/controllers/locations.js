const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance = (req, res, next) => {

};

const locationsCreate = (req, res, next) => {

};

const locationsReadOne = (req, res, next) => {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).exec((err, location) => {
            if (err) {
                console.log("\n---------- ERROR START ----------\n\n", err, "\n\n---------- ERROR END ----------\n\n");
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
