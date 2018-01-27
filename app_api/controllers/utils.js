const customError = (err, statusCode, res) => {
    console.log("\nERROR\n", err);
    return res.status(statusCode).json({ message: err.message })
}

module.exports = {
    customError
};
