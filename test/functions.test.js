const test = require('firebase-functions-test')();
const functions = require('functions/index');
const api = require('api');
jest.mock('firebase-admin');
const admin = require('firebase-admin');


describe('addClap', () => {
  var db;
  beforeEach(() => {
    db = admin.database();
    db.ref = jest.fn();
  });


  it('should return status 200 on GET', async () => {
    const req = api.request();
    const res = api.getClapsResponse();

    await functions.getClaps(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should fail', async () => {
    const req = api.request({}, false);
    const res = api.getClapsResponse();

    await functions.getClaps(req, res);
    expect(db.ref).toHaveBeenCalled();
  });
});


describe('getClaps', () => {
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
