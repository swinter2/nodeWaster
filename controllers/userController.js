
exports.get = function (req, res, next) {
    // Need to be logged in to get this stuff.
    // TODO: Get the current user's information
    res.writeHead(500, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({
        error: "This is an error."
    }));
}

exports.save = function (req, res, next) {
    // Need to be logged in to get this stuff.
    // Save the current user's information

    res.writeHead(500, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({
        error: "This is an error."
    }));
}

exports.create = function (req, res, next) {
    // Don't need to be logged in for this.

    res.writeHead(500, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({
        error: "This is an error."
    }));
}
