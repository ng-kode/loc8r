var express = require('express');
var router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');


/* Locations pages. */
router.get('/', ctrlLocations.homelist);
router.get('/locations/:locationid', ctrlLocations.locationInfo);
router.get('/locations/:locationid/reviews/new', ctrlLocations.addReview);
router.post('/locations/:locationid/reviews/new', ctrlLocations.doAddReview);


router.get('/about', ctrlOthers.about);

module.exports = router;
