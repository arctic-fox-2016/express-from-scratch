var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/purexpress');

var User     = require('./app/models/user');

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function(req, res, next) {

  console.log('Something is happening.');
  next();
});


router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});


router.route('/users')


.post(function(req, res) {

  var user = new User();
  user.name = req.body.name;


  user.save(function(err) {
    if (err)
    res.send(err);

    res.json({ message: 'User created!' });
  });
});

router.route('/users')

.post(function(req, res) {



})

.get(function(req, res) {
  User.find(function(err, users) {
    if (err)
    res.send(err);

    res.json(users);
  });
});

router.route('/users/:user_id')

// .get(function(req, res) {
//
// })


.put(function(req, res) {


  User.findById(req.params.user_id, function(err, user) {

    if (err)
    res.send(err);

    user.name = req.body.name;


    user.save(function(err) {
      if (err)
      res.send(err);

      res.json({ message: 'User updated!' });
    });

  });
});


router.route('/users/:name')

.delete(function(req, res) {
  User.remove({
    name: req.params.name
  }, function(err, user) {
    if (err)
    res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
});



app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);
