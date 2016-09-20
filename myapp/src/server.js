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

        postman.save(function(err) {
            if (err)res.send(err);
            // res.json({ message: 'Postman created!' });
            res.render('../views/post',{
              postman: postman.name,
              isPost : true,
              isDeleted:false,
              isUpdated:false
            })
        });
    })
    .get(function(req, res) {
      Postman.find(function(err,postmans){
        if (err) res.send(err)
        //res.json(postmans)
        res.render('../views/index',{
          postmans2: postmans
        })
      })
    })


router.route('/postman/:postman_id')
    .delete(function(req, res) {
      Postman.remove({_id: req.params.postman_id}, function(err, postman){
        if (err){res.send(err)}
        else{
          console.log(req.params.postman_id);
          //  res.json({ message : 'successfully deleted'})
           res.render('../views/post',{
             postman: req.params.postman_id,
             isPost: false,
             isDeleted: true,
             isUpdated: false
           })
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
                //res.json({ message: 'Postman updated!' });
                res.render('../views/post',{
                  postman: postman.name ,
                  isPost: false,
                  isDeleted: false,
                  isUpdated: true
                })
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
