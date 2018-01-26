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
        _id: body._id,
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
            maxDistance: 1000
        }
    }
    request(options, (err, response, body) => {
        if (err) { return utils.customError(err, res) };
        if (response.statusCode != 200) {  return utils.customError(body, res, false) };

        renderHomepage(req, res, body);
    })
};

const renderDetailPage = (req, res, body) => {
    res.render('location-info', {
        name: body.name,
        address: body.address,
        rating: 3,
        facilities: body.facilities,
        openingTimes: body.openingTimes,
        coords: { lng: body.coords[0], lat: body.coords[1] },
        reviews: body.reviews,
        summaryLead: "Simon's cafe is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
        summary: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    })
}

const locationInfo = (req, res, next) => {
    const options = {
        url: apiOptions.server + 'api/locations/' + req.params.locationid,
        method: "GET",
        json: {},
        query: {}
    }
    request(options, (err, response, body) => {
        if (err) { return utils.customError(err, res) }
        if (response.statusCode != 200) { return utils.customError(body, res, false) }
        return renderDetailPage(req, res, body)
    })

};

const addReview = (req, res, next) => {
    res.render('location-review-form', {title: 'Add Review'})
};


module.exports = {
    homelist,
    locationInfo,
    addReview
};
