'use strict'

const express = require('express')
var path = require('path');
var bodyParser = require('body-parser');

let app = express()
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug')
app.listen(3000)

app.get('/', function(req, res){
  res.render('index', { type: "GET", title: req.query.title, message: req.query.message});
})
app.post('/', function(req, res){
  res.render('index', { type: "POST", title: req.body.title, message: req.body.message});
})
app.put('/', function(req, res){
  res.render('index', { type: "PUT", title: req.body.title, message: req.body.message});
})
app.delete('/', function(req, res){
  res.render('index', { type: "DELETE", title: req.body.title, message: req.body.message});
})
