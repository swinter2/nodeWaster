var express = require('express')
    ,fs = require('fs')
    ,logfmt = require("logfmt")
    ,userController = require('./controllers/userController')
    ,sessionController = require('./controllers/sessionController')
    ;
var app = express();

app.use(logfmt.requestLogger());

app.use("/static", express.static('./static'));

////////////////////////////////////////////////////////////////////////////////////
app.post('/user/get', userController.get);
app.post('/user/save', userController.save);
app.post('/user/create', userController.create);
app.post('/session/get', sessionController.get);
app.post('/session/save', sessionController.save);

app.get('/', function (req, res, next) {
    res.send("ldkjflksajfsd");

    // fs.readFile('./views/index.html', function (err, data) {
    //     res.end(data);
    // });
});

app.use(function(req, res, next){
    fs.readFile('./views/404.html', function (err, data) {
        res.statusCode = 404;
        res.end(data);
    });
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    fs.readFile('./views/500.html', function (err, data) {
        res.statusCode = 500;
        res.end(data);
    });
});

var port = Number(process.env.PORT || 8000);
var server = app.listen(port, function () {
    console.log("Listening on port %d", server.address().port);
});

