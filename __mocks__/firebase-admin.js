var jest = require('jest-mock');

var firebasemock    = require('firebase-mock');
var iso = require('../public/js/isocountries.json')
var Chance = require('chance');
var chance = new Chance();

var mockauth = new firebasemock.MockAuthentication();
var mockdatabase = new firebasemock.MockFirebase().autoFlush();
var mockfirestore = new firebasemock.MockFirestore().autoFlush();
var mockstorage = new firebasemock.MockStorage();
var mockmessaging = new firebasemock.MockMessaging();

mockdatabase.seed = function(data) {
  if (!data) {
    var codes = Object.keys(iso);
    var num_country_entries = chance.natural({min: 1, max: codes.length});
    var total = 0;
    var data = {};
    for(const i of Array(num_country_entries).keys()) {
      // Get a random country
      var code = codes[chance.natural({max: codes.length-1})];
      var claps = chance.natural({max: 100000});
      total += claps;
      data[code] = {
        count: claps,
      }
    }
    data['total'] = {
      count: total
    }
    data['today'] = {
      count: chance.natural({max: total})
    }
  }
  // Set the data in the mocked database
  mocksdk.database().ref('claps').set(data);
}
mockdatabase.clear = function() {
  mocksdk.database().ref().set({});
}

var mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return null;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return null;
  },
  // use null if your code does not use MESSAGING
  () => {
    return null;
  }
);

mocksdk.initApp = jest.fn();
module.exports = mocksdk;
