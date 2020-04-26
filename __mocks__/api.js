/*********************************************************
* This module mocks the api responses from the firebase *
* functions. It generates random requests and responses *
* that we can use for testing purposes. This allows us  *
* to see the behavior of our front and api with close to*
* real life responses from our api. If the functions'   *
* responses are modified, this too must be adjusted     *
*********************************************************/

var jest = require('jest-mock');
var iso = require('../public/js/isocountries.json')
var Chance = require('chance');
var chance = new Chance();
const querystring = require('querystring');


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


module.exports.request = function(query, with_country = true) {
  const req = {};
  req.method = "GET";
  req.query = querystring.encode(query);
  req.headers = {};
  if (with_country) {
    var codes = Object.keys(iso);
    req.headers = {
      "x-appengine-country": codes[chance.natural({max: codes.length-1})],
    };
  }
  return req;
}


module.exports.getClapsResponse = function() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
}
