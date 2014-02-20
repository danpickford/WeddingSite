var express = require('express'),
				easing = require('easing'),
				winston = require('winston');

var app = express();

app.use(express.static(__dirname + '/'));
app.configure(function () {
    app.use(express.bodyParser());
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  winston.log("Listening on " + port);
  console.log("Listening on " + port);
});

exports = module.exports = app;