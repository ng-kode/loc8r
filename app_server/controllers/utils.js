const customError = (err, res, internal=true) => {
    console.log("\nERROR\n", err);
    if (!internal) {
        return res.render('generic-text', { title: 'Oops...', message: err.message })
    } else {
        return res.render('generic-text', { title: 'Oops...', message: "Sorry, internal error" })
    }
}

module.exports = {
    customError
};
