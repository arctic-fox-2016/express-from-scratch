'use strict'

const express = require ('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require ('body-parser')

app.set('views', path.join(__dirname,'../views'))
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.get('/', function (req, res){
  res.render("index", {title: 'HomePage'})
});

app.use(express.static(path.join(__dirname,'public')))
// app.use(express.static(path.join(__dirname+'public/img')))
// app.use(express.static(path.join(__dirname+'public/css')))
// app.use(express.static(path.join(__dirname+'public/js')))
// app.get('/public/img/brendan_eich.jpg', function (req, res){
//   res.sendFile('/public/img/brendan_eich.jpg')
// });
 app.post('/', function (req, res){
  res.render("post", {title : 'Post' })
});

 app.put('/', function (req, res){
  res.render("put", {title : 'Put' })
});

app.delete('/', function (req, res){
  res.render("delete", {title: 'delete'})
});


app.use('/api', router);


app.listen(port);
console.log('Your Port' + port);
