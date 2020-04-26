// GLOBALS
var fade_duration = 250;
var isoCountries;
$.ajax({
  url: "/js/isocountries.json",
  dataType: 'json',
  async: false,
  success: function(json){
    isoCountries = json;
  }
});

$(document).ready(function() {
  // 1) Start by retrieving the data from the dataset.
  renderInitialData();
  // 2) Hook all buttons to actions and/or views
  setupClap();
  setupLinks();
  setupShare();
  setupContactForm();

});

//////////////// HELPER FUNCTIONS /////////////////////

function getCountryName (countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

function count(object, startNum, time=3000) {
  var $this = object
  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
    duration: time,
    easing: 'swing',
    step: function () {
      $this.text(Math.ceil(this.Counter));
    }
  });
};

async function getData() {
  await fetch('/getClaps', {
    method: 'get'
  })
  .then(resp => resp.json())
  .then(data => {
    flag_url = "https://www.countryflags.io/" + data['country'] + "/flat/64.png";
    $('.country_flag').attr("src", flag_url);
    $('#country_claps').html(data['c_count'] + 1); // Add 1 to consider upcoming clap
    $('#country_name').html(getCountryName(data['country']));
    $('#global_claps').html(data['g_count'] + 1); // Add 1 to consider upcoming clap
    $('#daily_claps').html(data['day_count']);
  })
}

async function sendClap() {
  await fetch('/addClap', {
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(err => {
    console.error(err);
  });
}

async function sendContact(formData) {
  var url = '/addContact?' + $.param(formData);
  await fetch(url, {
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(err => {
    console.log(err);
  })
}

async function sendMessage(formData) {
  var url = '/addMessage' + $.param(formData);
  await fetch(url, {
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(err => {
    console.log(err);
  })
}

function toastText(msg) {
  $toaster = $('#toaster');
  console.log(msg);
  $toaster.html(msg);
  $toaster.fadeIn(fade_duration);
  $toaster.delay(fade_duration*5).fadeOut(fade_duration);
}

async function renderInitialData() {
  await getData().then(function() {
    // Once loaded, hide the loading icon and display the main view
    $('#loader').fadeOut(fade_duration);
    $('#main').fadeIn(fade_duration);
      count($('#daily_claps'), 0);
  });
}

function setupClap() {
  $("#clap_button").click(function(e) {
    e.preventDefault();
    $('#main').fadeOut(fade_duration);
    sendClap();
    $('#results').delay(fade_duration).fadeIn(fade_duration);
    $('#results').find('.counter').each(function (i) {
      console.log($(this).text());
      count($(this), 0);
    });
  });
}

function setupLinks() {
  $('.js-link').each(function (i) {
    $(this).click(function(e) {
      e.preventDefault();
      $(this).closest('section').fadeOut(fade_duration);
      var href = $(this).attr('href');
      var value = $(this).data('value');
      if (value !== undefined) {
        $('#help-type').val(parseInt(value));
      }
      $(href).delay(fade_duration).fadeIn(fade_duration);
    })
  });
}

function setupShare() {
  $('.share-btn').each(function (i) {
    $(this).click(function(e) {
      console.log('Sharing link')
      e.preventDefault();
      if (navigator.share) {
        navigator.share({
          title: 'ClapHelp',
          text: 'Show support for those fighting COVID-19',
          url: 'https://claphelp.life'
        }).then(() => {
          console.log('thanks for sharing');
        }).catch((err) => {
          console.error(err);
        });
      } else {
        console.log('No share API, copy link');
        var dummy = document.createElement('input'), text = window.location.href;
        // dummy.setAttribute('style', 'display:none;');
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        if (document.execCommand('copy')) {
          // TODO: display a notice indicating the link was copied
          toastText('Link copied!');
        } else {
          console.error('Couldnt copy the link');
        }
        document.body.removeChild(dummy);
      }
    });
  });
}

function setupContactForm() {
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    console.log('Sending email');
    var formData = {
      "type": $('#help-type').val(),
      "email": $('#email').val(),
    }
    sendContact(formData).then(function(res) {
      console.log(res);
    });
    $('#contact').fadeOut(fade_duration);
    $('#thanks').delay(fade_duration).fadeIn(fade_duration);
  });
}

function setupMessage() {
  $('message-form').submit(function(e) {
    e.preventDefault();
    console.log('Sending Message');
    var formData = {
      "writtenMessage": $("#writtenMessage").val,
      "remmitent": $("#remmitent").val,
      "region": $("#region ").val,
      "email": $("#email").val,
    }

    sendMessage(formData).than(function(res) {
      console.log(res);
    })
  });
};