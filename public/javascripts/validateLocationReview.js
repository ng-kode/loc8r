$("#addReview").submit(function (e) {
    var $alert = $(this).find("#jsValidate");
    $alert.hide();
    let missingVal = [];
    if ($("#name").val() == "") missingVal.push("name");
    if (!$("#rating").val()) missingVal.push("rating");
    if ($("#reviewText").val() == "") missingVal.push("reviewText");
    if (missingVal.length > 0) {
        e.preventDefault();
        $alert.show().text(`${missingVal.join(", ")} required. Please fill in and submit again.`)
    }
    return;
})
