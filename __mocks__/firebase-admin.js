var firebasemock    = require('firebase-mock');

var mockauth = new firebasemock.MockAuthentication();
var mockdatabase = new firebasemock.MockFirebase().autoFlush();
var mockfirestore = new firebasemock.MockFirestore().autoFlush();
var mockstorage = new firebasemock.MockStorage();
var mockmessaging = new firebasemock.MockMessaging();
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
