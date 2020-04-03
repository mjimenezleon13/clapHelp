const cors = require('cors')
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);

exports.addClap = functions.https.onRequest( async(req, res) => {
  // Add a clap to firestore
  const country_code = req.headers["x-appengine-country"];
  console.log('Adding a clap from ' + country_code);
  const country_doc = db.collection('claps').doc(country_code);
  const global_doc = db.collection('claps').doc('GLOBAL');
  var country_claps;
  var global_claps;

  // Get the data
  country_claps = await country_doc.get().then((snap) => {
    if (!snap.exists) {
      country_doc.set({count: 0});
      return 0;
    } else {
      return snap.data().count;
    }
  });

  global_claps = await global_doc.get().then((snap) => {
    if (!snap.exists) {
      global_doc.set({count: 0});
      return 0;
    } else {
      return snap.data().count;
    }
  });

  // Update the data
  country_doc.update({count: increment});
  global_doc.update({count: increment});

  res.set('Cache-Control', 'public, max-age=150, s-maxage=300');
  res.json({
    "country": country_code,
    "c_count": country_claps + 1,
    "g_count": global_claps + 1,
  })
});
