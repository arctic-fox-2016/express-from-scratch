'use strict'

const express = require('express')
let app = express(),
    bodyParser = require('body-parser'),
    router = express.Router()



let mongoose = require('mongoose')
mongoose.connect('mongodb://ari:password@ds033096.mlab.com:33096/kontak')

let Postman = require('../models/postman')

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)


router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res){
  res.json({message: 'API has been used'})
})

router.route('/postman')
    .post(function(req, res) {
        var postman = new Postman();      // create a new instance of the Bear model
        postman.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        postman.save(function(err) {
            if (err)res.send(err);
            res.json({ message: 'Postman created!' });
        });

    })
    .get(function(req, res) {
      Postman.find(function(err,postmans){
        if (err) res.send(err)
        res.render('../views/index',postmans)
      })
    })


router.route('/postman/:postman_id')
    .delete(function(req, res) {
      Postman.remove({_id: req.params.postman_id}, function(err, postman){
        if (err){res.send(err)}
        else{
          res.json({ message : 'successfully deleted'})
        }
      })
    })
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Postman.findById(req.params.postman_id, function(err, postman) {
            if (err)
                res.send(err);
            postman.name = req.body.name;
            postman.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Postman updated!' });
            });

        });
    })
    .get(function(req, res) {
      Postman.findById(req.params.postman_id, function(err, postman){
        if (err){res.send}
        else{res.json(postman)}
      })
    })

app.listen(4000)
console.log('server sudah up ');
