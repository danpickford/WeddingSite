var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/'));
app.configure(function () {
    app.use(express.bodyParser());
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});