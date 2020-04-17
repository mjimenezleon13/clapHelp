/*********************************************************
 * This module mocks the api responses from the firebase *
 * functions. It generates random requests and responses *
 * that we can use for testing purposes. This allows us  *
 * to see the behavior of our front and api with close to*
 * real life responses from our api. If the functions'   *
 * responses are modified, this too must be adjusted     *
 *********************************************************/

var iso = require('../public/js/isocountries.json')
var Chance = require('chance');
var chance = new Chance();

module.exports.getClaps = function () {
  var codes = Object.keys(iso);
  var code = codes[chance.natural({max: codes.length-1})];
  return {
    country: code,
    c_count: chance.natural(),
    g_count: chance.natural(),
    day_count: chance.natural()
  }
}

module.exports.addClap = function () {
  var codes = Object.keys(iso);
  var code = codes[chance.natural({max: codes.length-1})];
  return {
    country: code,
    createdAt: Date.now()
  }
}

module.exports.addContact = function() {
  return {
    type: chance.pickone(["message","donate","teamhelp"]),
    email: chance.email()
  }
}
