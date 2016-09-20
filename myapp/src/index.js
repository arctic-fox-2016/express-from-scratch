'use strict'

const express = require ('express')
let app = express()

app.get('/', function (req, res){
  res.send("I love Hacktiv8!")
})

app.listen(3000)
