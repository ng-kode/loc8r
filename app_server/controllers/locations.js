module.exports.homelist = (req, res, next) => {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
          title: 'Loc8r',
          strapline: 'Find places to work with wifi near you!'
        },
        locations: [
          {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: [ 'Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
          }, {
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: [ 'Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
          }, {
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
          }
        ],
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    })
};

module.exports.locationInfo = (req, res, next) => {
    const monthArr = ["Nothing", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const d1 = new Date(2018, 1, 23)
    const d2 = new Date(2017, 7, 11)
    res.render('location-info', {
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: [ 'Hot drinks', 'Food', 'Premium wifi'],
        distance: '100m',
        openingTimes: [
            {
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            },
            {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            },
            {
                days: 'Sunday',
                closed: true
            },
        ],
        mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14764.396703283839!2d114.18555039751222!3d22.31208868261436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400e196516635%3A0x3fcd21c76c5a5ca4!2zU3RhcmJ1Y2tzIENvZmZlZSDmmJ_lt7TlhYs!5e0!3m2!1sen!2shk!4v1516712487947",
        reviews: [
            {
                rating: 5,
                author: "Samantha Thavasa",
                createdOn: `${d1.getDate()} ${monthArr[d1.getMonth()]} ${d1.getFullYear()}`,
                text: "Great great place to have a chat with Victoria Harbour near you !"
            },
            {
                rating: 3,
                author: "Ted Baker",
                createdOn: `${d2.getDate()} ${monthArr[d2.getMonth()]} ${d2.getFullYear()}`,
                text: "Coffee as crappy as usual by the view is nice"
            }
        ],
        summaryLead: "Simon's cafe is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
        summary: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    })
};

module.exports.addReview = (req, res, next) => {
    res.render('location-review-form', {title: 'Add Review'})
};
