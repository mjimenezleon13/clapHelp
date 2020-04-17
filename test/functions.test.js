// const admin = require('firebase-admin');
// admin.initializeApp = jest.fn();

const test = require('firebase-functions-test')();
const functions = require('functions/index');

jest.mock('cors');
require('cors');

const validRequest = {
  method: "GET",
  headers: {
    "x-appengine-country": "CO",
  }
}

describe('getClaps', () => {
  it('should return status 200 on GET', () => {
    // Request
    const mockRequest = {
      method: "GET",
      set: jest.fn()
    };
    // Response
    const mockResponse = {
      status: code => {expect(code).toEqual(200);}
    };
    functions.getClaps(mockRequest, mockResponse);
  });


  it('should return expected json structure', () => {
    // Request
    const mockRequest = {
      method: "GET",
      set: jest.fn(),
      headers: {
        "x-appengine-country": "CO"
      }
    }
    // Response
    const mockResponse = {
      json: obj => {expect(obj).toHaveProperty('country', 'c_count', 'g_count', 'day_count');}
    }

    functions.getClaps(mockRequest, mockResponse);
  });


  it('should return data from requested country', () => {
    // Request
    const mockRequest = {
      method: "GET",
      set: jest.fn(),
      headers: {
        "x-appengine-country": "CO"
      }
    }
    // Response
    const mockResponse = {
      json: obj => {expect(obj).toMatchObject({country: 'CO'})}
    }

    functions.getClaps(mockRequest, mockResponse);
  });


  it('should return unknown country on missing header', () => {
    // Request
    const mockRequest = {
      method: "GET",
      set: jest.fn()
    };

    // Response
    const mockResponse = {
      json: obj => {expect(obj).toMatchObject({country: 'ZZ'});}
    };

    functions.getClaps(mockRequest, mockResponse);
  });
});
