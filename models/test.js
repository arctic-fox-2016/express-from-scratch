'use strict';
module.exports = function(sequelize, DataTypes) {
  var test = sequelize.define('test', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return test;
};