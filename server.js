var express = require('express');
var tambola = require('tambola-generator')
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  var tickets = tambola.getTickets(18);
  var sequence = tambola.getDrawSequence();
  res.render('index',{tickets: tickets,sequence: sequence});
});

app.listen(process.env.PORT || 1234);
