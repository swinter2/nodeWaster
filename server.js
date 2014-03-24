var express = require('express'),
    fs = require('fs'),
    logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.use("/static", express.static('./static'));
app.use("/", express.static('./views'));

app.use(function(req, res, next){
    res.send(404, "Page not found!");
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, "Whoops, there was an error.");
});

var port = Number(process.env.PORT || 8000);
var server = app.listen(port, function () {
    console.log("Listening on port %d", server.address().port);
});

