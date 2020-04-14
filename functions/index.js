const cors = require('cors')({origin: true,});
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database();
const increment = admin.firestore.FieldValue.increment(1);

var helpOptions = [
  "message",
  "donate",
  "teamhelp",
];

function getHelpType(helpIdx) {
  if ( helpIdx < helpOptions.length) {
    return helpOptions[helpIdx];
  } else {
    return "unknown";
  }
}

exports.addClap = functions.https.onRequest( async(req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  return cors(req, res, async () => {
    const country_code = req.headers["x-appengine-country"] || 'ZZ';
    var clapsRef = db.ref('claps');
    var newClap = clapsRef.push();
    clap_data = {
      country: country_code,
      createdAt: Date.now(),
    };
    newClap.set(clap_data);
    res.json(clap_data);
  });
});

exports.getClaps = functions.https.onRequest( async(req,res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=150');
  return cors(req, res, async() => {
    const country_code = req.headers["x-appengine-country"] || 'ZZ';
    var clapsRef = db.ref().child('/claps');
    clapsRef.on('value', snapshot => {
      data = snapshot.val();
      arr = []
      for (var i in data) {
        arr.push(data[i]);
      }
      g_l = arr.length; // Size of all the data
      c_l = arr.filter(el => el.country === country_code).length; //country specific count
      // get all items from 24 hours
      min_timestamp = Date.now() - (24*3600*1000);
      day_l = arr.filter(el => el.createdAt >= min_timestamp).length;
      result = {
        country: country_code,
        c_count: c_l,
        g_count: g_l,
        day_count: day_l
      }
      res.json(result);
    });
  })
})

exports.addContact = functions.https.onRequest( async(req, res) => {
  return cors(req, res, async () => {
    const query = req.query;
    result = {
      type: getHelpType(parseInt(query['type'])),
      email: query['email'],
    }
    var contactsRef = db.ref().child('contacts');
    var newContact = contactsRef.push(result);
    res.json(result);
  })
})
