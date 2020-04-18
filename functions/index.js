const cors = require('cors')({origin: true,});
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database();
const increment = admin.firestore.FieldValue.increment(1);

// keeps trak of when the today's clap counter needs to be reseted
var nextUpdate =Date.now();

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
 
// puts a clap in the database
exports.addClap = functions.https.onRequest( async(req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  return cors(req, res, async () => {
    resetDayCount();
    const country_code = req.headers["x-appengine-country"];
    //const country_code = "CO";
    var countryRef = db.ref('claps/'+country_code);
    var todayRef = db.ref('claps/today');
    var totalRef = db.ref('claps/total');

    var returnData;
    var totalCount = -1;
    var todayCount = -1;
    var countryCount = -1;

    //increases total claps
    await totalRef.once("value", function(snapshot) {
      totalCount = snapshot.val().count;
      totalCount++;
      totalRef.update({
        count: totalCount
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    //increases country claps
    await countryRef.once("value", async function(snapshot) {
      countryCount = snapshot.val().count;
      countryCount++;
      countryRef.update({
        count: countryCount
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    //increases today claps
    await todayRef.once("value", async function(snapshot) {
      todayCount = snapshot.val().count;
      todayCount++;
      todayRef.update({
        count: todayCount
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    returnData = {
      countryClaps: countryCount,
      totalClaps: totalCount,
      todayClaps: todayCount
    };
    res.json(returnData);
  });
});

// gets json with total number of claps, country claps and todays's claps 
exports.getClaps = functions.https.onRequest( async(req,res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=150');
  return cors(req, res, async() => {
    resetDayCount();
    const country_code = req.headers["x-appengine-country"];
    //const country_code = "CO";

    var countryRef = db.ref('claps/'+country_code);
    var todayRef = db.ref('claps/today');
    var totalRef = db.ref('claps/total');

    var result;
    var totalCount = -1;
    var todayCount = -1;
    var countryCount = -1;

    //gets total claps
    await totalRef.once("value", function(snapshot) {
      totalCount = snapshot.val().count;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    //gets country claps
    await countryRef.once("value", function(snapshot) {
      countryCount = snapshot.val().count;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    //gets today claps
    await todayRef.once("value", function(snapshot) {
      todayCount = snapshot.val().count;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    result = {
      country: country_code,
      c_count: countryCount,
      g_count: totalCount,
      day_count: todayCount
      }
    res.json(result);
  });
});

// puts a message in the database given the text(content of the message), remmitent, region and email
exports.addMessage = functions.https.onRequest( async(req, res) => {
  return cors(req, res, async () => {
    const country_code = req.headers["x-appengine-country"];
    //const country_code = "CO";
    const query = req.query;
    var messageRef = db.ref('messages');
    var newMessage = messageRef.push();
    messageData = {
      text: query['text'],
      remmitent: query['remmitent'],
      date: Date.now(),
      country: country_code,
      region: query['region'],
      email: query['email']
    };
    newMessage.set(messageData);
    res.json(messageData);
  })
});

// adds a fundation to the database given the title, description, link, photo link and country code
exports.addFoundation = functions.https.onRequest( async(req, res) => {
  return cors(req, res, async () => {
    const query = req.query;
    const country_code = query['country'];
    var foundationRef;
    if(country_code != null){
      foundationRef = db.ref('foundations/'+country_code);
    }
    else{
      foundationRef= db.ref('foundations/dafault');
    }
    var newFoundation = foundationRef.push();
    data = {
      title: query['title'],
      description: query['description'],
      link: query['link'],
      photo: query['photo']
    };
    newFoundation.set(data);
    res.json(data);
  })
});

// gets json with all foundations under a given country
exports.getCountryFoundations = functions.https.onRequest( async(req,res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=150');
  return cors(req, res, async() => {
    resetDayCount();
    const country_code = req.headers["x-appengine-country"];
    //const country_code = "CO";

    var foundationsRef = db.ref('foundations/'+country_code);

    var result ;

    await foundationsRef.once("value", function(snapshot) {

        result = snapshot.val();
    });
    
    res.json(result);
  });
});

// gets json with all default foundations
exports.getDefaultFoundations = functions.https.onRequest( async(req,res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=150');
  return cors(req, res, async() => {
    resetDayCount();
    var foundationsRef = db.ref('foundations/default');
    var result ;
    await foundationsRef.once("value", function(snapshot) {
        result = snapshot.val();
    });
    
    res.json(result);
  });
});

// puts a possible foundation given the country code and the link
exports.addPossibleFundation = functions.https.onRequest( async(req, res) => {
  return cors(req, res, async () => {
    const query = req.query;
    var possibleFRef = db.ref('possible-foundations');
    var newPossibleF = possibleFRef.push();
    data = {
      country: query['country'],
      link: query['link']
    };
    newPossibleF.set(data);
    res.status(201);
  })
});

// checks if today's clap counter needs to be reseted
async function resetDayCount(){
  if(Date.now() > nextUpdate){
    var todayRef = db.ref('claps/today');
    // reset counter
    await todayRef.update({
      count: 0
    });
    // next update date will be in 24 hours 
    nextUpdate += 24*3600;
  }
  return;
}
exports.addContact = functions.https.onRequest( async(req, res) => {
  const query = req.query;
  result = {
    type: getHelpType(parseInt(query['type'])),
    email: query['email'],
  }
  var contactsRef = db.ref().child('contacts');
  var newContact = contactsRef.push(result);
  res.status(200).json(result);
})
