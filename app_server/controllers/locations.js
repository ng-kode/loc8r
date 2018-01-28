const request = require('request');
const utils = require('./utils');

let apiOptions = {
    server: "http://localhost:3000/"
}
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://vast-fjord-68640.herokuapp.com/"
}

const renderHomepage = (req, res, body) => {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
          title: 'Loc8r',
          strapline: 'Find places to work with wifi near you!'
        },
        locations: body,
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    })
}

const homelist = (req, res, next) => {
    const options = {
        url: apiOptions.server + 'api/locations',
        method: "GET",
        json: {},
        qs: {
            lng: 114.188880,
            lat: 22.301462,
            maxDistance: 250
        }
    }
    request(options, (err, response, body) => {
        if (err) { return utils.customError(err, res) };
        if (response.statusCode != 200) {  return utils.customError(body, res, false, "/") };

        renderHomepage(req, res, body);
    })
};

const getLocationInfo = (req, res, callback) => {
    const options = {
        url: apiOptions.server + 'api/locations/' + req.params.locationid,
        method: "GET",
        json: {},
        query: {}
    }
    request(options, (err, response, body) => {
        if (err) { return utils.customError(err, res) }
        if (response.statusCode != 200) { return utils.customError(body, res, false) }

        let data = body
        data.lng = body.coords[0]
        data.lat = body.coords[1]
        callback(req, res, data)
    })
};

const renderDetailPage = (req, res, data) => {
    res.render('location-info', {
        googleapikey: process.env.GOOGLE_API_KEY,
        _id: data._id,
        name: data.name,
        address: data.address,
        rating: 3,
        facilities: data.facilities,
        openingTimes: data.openingTimes,
        lng: data.lng,
        lat: data.lat,
        reviews: data.reviews,
        summaryLead: "Simon's cafe is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
        summary: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    })
}

const locationInfo = (req, res, next) => {
    getLocationInfo(req, res, (req, res, data) => {
        renderDetailPage(req, res, data)
    })
}

const renderReviewForm = (req, res, data) => {
    res.render('location-review-form', {
        title: `Review on ${data.name}`,
        error: req.query.error
    })
}

const addReview = (req, res, next) => {
    getLocationInfo(req, res, (req, res, data) => {
        renderReviewForm(req, res, data)
    })

};

const doAddReview = (req, res, next) => {
    console.log(req.body);
    const options = {
        url: apiOptions.server + `api/locations/${req.params.locationid}/reviews`,
        method: "POST",
        json: {
            author: req.body.name,
            rating: parseFloat(req.body.rating),
            reviewText: req.body.reviewText
        }
    }
    request(options, (err, response, body) => {
        if (err) return utils.customError(err, res);
        if (response.statusCode != 201) return utils.customError(body, res, false, `/locations/${req.params.locationid}/reviews/new?error=${body.message}`);
        if (response.statusCode == 201) {
            return res.redirect(`/locations/${req.params.locationid}`)
        }
    })
}


module.exports = {
    homelist,
    locationInfo,
    addReview,
    doAddReview
};
