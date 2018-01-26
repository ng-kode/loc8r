const customError = (err, res) => {
    console.log("\nERROR\n", err);
    if (err.name == "ValidationError") {
        return res.status(404).json({ "message": err.message })
    } else if (err.name == "CastError") {
        return res.status(404).json({ "message": err.message })
    } else {
        return res.status(404).json({ "message": "Sorry, internal error" })
    }
}

module.exports = {
    customError
};
