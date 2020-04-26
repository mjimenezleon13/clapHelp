const test = require('firebase-functions-test')();
const functions = require('functions/index');
const api = require('api');
jest.mock('firebase-admin');
const admin = require('firebase-admin');
var firebasemock = require('firebase-mock');


describe('addClap', () => {
  var db;
  beforeEach(() => {
    db = admin.database();
    db.ref().clear();
    db.ref().seed();
  });


  it('should return status 200 on GET', async () => {
    const req = api.request();
    const res = api.getClapsResponse();


    await functions.addClap(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });


  it('should increase the claps of the specific country', async () => {
    const req = api.request({});
    const res = api.getClapsResponse();
    const country_code = req.headers["x-appengine-country"] || 'ZZ';
    // Get current country count. If country not registered, then default to count: 0
    const old_data = db.ref('claps').data[country_code] || {count: 0};

    // Simulate a clap being added from that country
    await functions.addClap(req, res);
    const new_data = db.ref('claps').data[country_code];
    // Expect new data to be equal to previous data + 1
    expect(new_data.count).toEqual(old_data.count + 1);
  });


  it('should increase the claps of today', async () => {
    const req = api.request({});
    const res = api.getClapsResponse();
    // Get current count. If not registered, then default to count: 0
    const old_data = db.ref('claps').data["today"] || {count: 0};


    // Simulate a clap being added
    await functions.addClap(req, res);
    const new_data = db.ref('claps').data["today"];
    // Expect new data to be equal to previous data + 1
    expect(new_data.count).toEqual(old_data.count + 1);
  });


  it('should increase the total claps count', async () => {
    const req = api.request({});
    const res = api.getClapsResponse();
    // Get current count. If not registered, then default to count: 0
    const old_data = db.ref('claps').data["total"] || {count: 0};


    // Simulate a clap being added
    await functions.addClap(req, res);
    const new_data = db.ref('claps').data["total"];
    // Expect new data to be equal to previous data + 1
    expect(new_data.count).toEqual(old_data.count + 1);
  });
});


describe('getClaps', () => {
  beforeEach(() => {
    db = admin.database();
  })

  it('should return status 200 on GET', async () => {
    const req = api.request();
    const res = api.getClapsResponse();

    await functions.getClaps(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });


  it('should return expected json structure', async () => {
    const req = api.request();
    const res = api.getClapsResponse();

    await functions.getClaps(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        country: expect.any(String),
        c_count: expect.any(Number),
        g_count: expect.any(Number),
        day_count: expect.any(Number)
      })
    );
  });


  it('should return data from requested country', async () => {
    const req = api.request();
    const res = api.getClapsResponse();

    await functions.getClaps(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({country: req.headers['x-appengine-country']})
    );
  });


  it('should return unknown country on missing header', async () => {
    const req = api.request({}, false); // request without a header
    const res = api.getClapsResponse();

    await functions.getClaps(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({country: 'ZZ'})
    );
  });
});
