const customError = (err, res, internal=true, redirect_url=null) => {
    console.log("\nERROR\n", err);
    if (!internal) {
        if (err.message) {
            if (redirect_url) return res.redirect(redirect_url);
            return res.render('generic-text', { title: 'Oops...', message: err.message })
        } else {
            return res.render('generic-text', { title: 'Oops...', message: "Working on the error..." })
        }
    } else {
        return res.render('generic-text', { title: 'Oops...', message: "Sorry, internal error" })
    }
}

module.exports = {
    customError
};
