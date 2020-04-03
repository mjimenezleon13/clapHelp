const cors = require('cors')({origin: true,});
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const rt_db = admin.database();
const increment = admin.firestore.FieldValue.increment(1);

exports.addClapRT = functions.https.onRequest( async(req, res) => {
  return cors(req, res, async () => {
    const country_code = req.headers["x-appengine-country"];
    var clapsRef = rt_db.ref('claps');
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
  return cors(req, res, async() => {
    const country_code = req.headers["x-appengine-country"];
    var clapsRef = rt_db.ref().child('/claps');
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

exports.addClap = functions.https.onRequest( async(req, res) => {
  // Add a clap to firestore
  return cors(req, res, async () => {
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
    });
  });
});
