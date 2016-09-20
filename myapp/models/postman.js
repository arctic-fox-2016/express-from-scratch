var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostmanSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Postman', PostmanSchema);
