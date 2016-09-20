var express = require('express')
var router = express.Router()


router.get('/', function(request, response){
  response.send('Hello Tevin!')
})


router.post('/api', function(request, response){
  console.log(request.query.name)
  response.render('index',{ title: 'helloowww', name: request.query.name })
})

router.delete('/api', function (request, response) {
  response.render('index', { title: 'Delete Data', name: request.query.name})

})

router.put('/api', function (request, response) {
  response.render('index', { title: 'Put Data', name: request.query.name})

})

module.exports = router
