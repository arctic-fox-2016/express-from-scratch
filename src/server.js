'use strict'
let express = require('express')
let app = express()
let model = require('../models/index')
let bodyParser = require('body-parser')


app.listen(3000)
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(request,response){
  model.test.findAll().then(function(identity){
    response.render("../views/index.ejs", {identity: identity})
  })
})

app.post('/add', function(request, response){
  model.test.create({firstname: request.body.firstname, lastname: request.body.lastname}).then(function(){
    response.json({message: "add sukses"})
  })
})

app.delete('/delete/:id', function(request, response){
  model.test.destroy({where: {id: request.params.id}}).then(function(){
    response.send('delete berhasil')
  })
})

app.put('/update', function(request, response){
  model.test.update({firstname: request.body.firstname,lastname: request.body.lastname},{where: {id: request.body.id}}).then(function(){
    response.send('delete berhasil')
  })
})
