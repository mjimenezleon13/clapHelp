const $ = jQuery = require( 'jquery' );
const api = require('api');
const iso = require('../public/js/isocountries.json')
global.fecth = require('jest-fetch-mock').enableMocks();

var Chance = require('chance');
var chance = new Chance();


// Bring the public js file and evaluate it for testing
var fs = require('fs');
filedata = fs.readFileSync('public/js/main.js', 'utf8');
eval(filedata);

// Since ajax calls are not supported, let's assign the isoCountries
// variable that would be assigned through ajax on main.js
isoCountries = iso;

// Now we can use the functions and variables inside main.js file
describe('getCountryName', () => {
  it('should return the correct country name', () => {
    var codes = Object.keys(iso);
    var randcode = codes[codes.length * Math.random() << 0];
    var randname = iso[randcode];
    expect(getCountryName(randcode)).toEqual(randname);
  });
});

describe('count', () => {
  var dest = Math.floor(Math.random(1000));
  beforeEach(() => {
    $.fx.off = true;
    document.body.innerHTML = `
      <div>
        <span class="count">${dest}</span>
      </div>
    `;
  });

  it('should reach the original number', () => {
    count($('.count'), 0);
    expect(parseInt($('.count').text())).toEqual(dest);
  });

});

describe('getData', () => {
  var res;
  beforeEach(() => {
    fetch.resetMocks();
    res = api.getClaps(); // generate a random response
    fetch.mockResponseOnce(JSON.stringify(res)); // hook the response to fetch
    // reset the document body
    document.body.innerHTML = `
      <div>
        <img class="flagDivImg country_flag" src="./images/Flag_of_Colombia.svg"/>
        <span id="country_name"></span>
        <span id="daily_claps"></span>
        <span id="country_claps"></span>
        <span id="global_claps"></span>
      </div>
    `;
  });


  it('should call the getClaps endpoint', () => {
    return getData().then(() => {
      expect(fetch.mock.calls[0][0]).toEqual('/getClaps');
    });
  });

  it('should set the correct country flag in view', () => {
    return getData().then(() => {
      expect($('.country_flag').attr('src')).toContain(res.country);
    });
  });

  it('should set the correct country name in view', () => {
    return getData().then(() => {
      expect($('#country_name').text()).toContain(iso[res.country]);
    });
  });


  it('should set the number of daily claps in view', () => {
    return getData().then(() => {
      expect(parseInt($('#daily_claps').text())).toEqual(res.day_count);
    });
  });

  it('should set and increase the number of country claps in view', () => {
    return getData().then(() => {
      expect(parseInt($('#country_claps').text())).toEqual(res.c_count + 1);
    });
  });

  it('should set and increase the number of global claps in view', () => {
    return getData().then(() => {
      expect(parseInt($('#global_claps').text())).toEqual(res.g_count + 1);
    });
  });
});

describe('sendClap', () => {
  var res;
  beforeEach(() => {
    fetch.resetMocks();
    res = api.addClap(); // generate a random response
    fetch.mockResponseOnce(JSON.stringify(res)); // hook the response to fetch
  });

  it('should call the addClap api endpoint', () => {
    return sendClap().then(() => {
      expect(fetch.mock.calls[0][0]).toEqual('/addClap');
    });
  });
});


describe('sendContact', () => {
  var res;
  var formData;
  beforeEach(() => {
    fetch.resetMocks();
    res = api.addClap(); // generate a random response
    formData = {
      "type": chance.natural({max: 2}),
      "email": chance.email()
    }
    fetch.mockResponseOnce(JSON.stringify(res)); // hook the response to fetch
  });

  it('should call the addContact api endpoint', () => {
    return sendContact(formData).then(() => {
      expect(fetch.mock.calls[0][0]).toContain('/addContact');
    });
  });

  it('should contain the form data as a query', () => {
    return sendContact(formData).then(() => {
      expect(fetch.mock.calls[0][0]).toContain('?' + $.param(formData));
    });
  });
});


describe('toastText', () => {
  var text;
  beforeEach(() => {
    fetch.resetMocks();
    text = chance.sentence({words: 3}); // generate a random text
    fetch.mockResponse(JSON.stringify({})); // hook the response to fetch
    document.body.innerHTML = `
      <div>
        <span id="toaster" style="display: none"></span>
      </div>
    `;
  });

  it('should insert the text into the toaster', () => {
    toastText(text);
    expect($('#toaster').text()).toEqual(text);
  });

  it('should display the toaster element', () => {
    const spyFadeIn = jest.spyOn($.fn, 'fadeIn');
    toastText(text);
    expect(spyFadeIn).toHaveBeenCalled();
  });

  it('should wait before fading out', () => {
    const spyDelay = jest.spyOn($.fn, 'delay');
    toastText(text);
    expect(spyDelay).toHaveBeenCalled();
  });

  it('should fade out', () => {
    const spyFadeout = jest.spyOn($.fn, 'fadeOut');
    toastText(text);
    expect(spyFadeout).toHaveBeenCalled();
  });
});


describe('renderInitialData', () => {
  beforeEach(() => {
    $.fx.off = true;
    document.body.innerHTML = `
      <div>
        <section id="loader"></section>
        <section id="main" style="display: none;"></section>
      </div>
    `;
  });
  // TODO: Fix this test
  // it('should call getData', async () => {
  //   getData = jest.fn();
  //   await renderInitialData();
  //   expect(getData).toHaveBeenCalled();
  // })

  it('should hide the loader', () => {
    return renderInitialData().then(() => {
      expect($('#loader').css('display')).toEqual('none');
    });
  });

  // TODO: Fix this test
  // it('should display the main view', () => {
  //   return renderInitialData().then(() => {
  //     expect($('#main').css('display')).toEqual('block');
  //   });
  // });
});
