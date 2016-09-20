'use strict'

var bodyParser = require('body-parser');
var routes = require('./routes/index');
var path = require('path')
const express = require('express')

let app = express()

// view engine setup
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', routes)
app.use('/api', routes);



app.listen(3000)
console.log('Server in on');


module.exports = app
