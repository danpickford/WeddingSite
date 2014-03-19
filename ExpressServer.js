var express = require('express'),
    app = express();

var _mg = require('mailgun');

app.use(express.static(__dirname + '/'));
app.configure(function () {
    app.use(express.bodyParser());
});

app.post("/RSVP", function (req, res, next) {
    var currentdate = new Date();

    console.log("RSVP for " + req.body.name + " " + req.body.lastname + " date: " + currentdate);

    var body = req.body.name + " has RSVPd with the following infomation.";
    body = body + "\nContact: " + req.body.contact + " .";
    body = body + "\nMessage: " + req.body.message + " .";
    body = body + "\ndiet:" + req.body.diet + ". Dan rulez!";

    var mg = new _mg.Mailgun('key-453l9v4j7iwlj9szikhpsf56bl-zjbj1');
    mg.sendText('rsvp@markandkathsbigday.co.uk', ['kathryncrowle@hotmail.com', 'harrisonmeister@gmail.com'],
    //mg.sendText('rsvp@markandkathsbigday.co.uk', ['idaniel.pickford@gmail.com'],
         req.body.name + ' has RSVPd.', body,
         { 'X-Campaign-Id': 'newQuotes' },
         function (err) { err && console.log(err); });

    res.send(200);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});