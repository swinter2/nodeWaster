var mongodb = require('mongodb');

exports.get = function (req, res, next) {
    res.writeHead(500, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({
        error: "whatever;"
    }));
};

exports.save = function (req, res, next) {
    res.writeHead(500, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({
        error: "whatever;"
    }));
};

