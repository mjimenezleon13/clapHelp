// GLOBALS

var fade_duration = 250;

var isoCountries = {
  'AF' : 'Afghanistan',
  'AX' : 'Aland Islands',
  'AL' : 'Albania',
  'DZ' : 'Algeria',
  'AS' : 'American Samoa',
  'AD' : 'Andorra',
  'AO' : 'Angola',
  'AI' : 'Anguilla',
  'AQ' : 'Antarctica',
  'AG' : 'Antigua And Barbuda',
  'AR' : 'Argentina',
  'AM' : 'Armenia',
  'AW' : 'Aruba',
  'AU' : 'Australia',
  'AT' : 'Austria',
  'AZ' : 'Azerbaijan',
  'BS' : 'Bahamas',
  'BH' : 'Bahrain',
  'BD' : 'Bangladesh',
  'BB' : 'Barbados',
  'BY' : 'Belarus',
  'BE' : 'Belgium',
  'BZ' : 'Belize',
  'BJ' : 'Benin',
  'BM' : 'Bermuda',
  'BT' : 'Bhutan',
  'BO' : 'Bolivia',
  'BA' : 'Bosnia And Herzegovina',
  'BW' : 'Botswana',
  'BV' : 'Bouvet Island',
  'BR' : 'Brazil',
  'IO' : 'British Indian Ocean Territory',
  'BN' : 'Brunei Darussalam',
  'BG' : 'Bulgaria',
  'BF' : 'Burkina Faso',
  'BI' : 'Burundi',
  'KH' : 'Cambodia',
  'CM' : 'Cameroon',
  'CA' : 'Canada',
  'CV' : 'Cape Verde',
  'KY' : 'Cayman Islands',
  'CF' : 'Central African Republic',
  'TD' : 'Chad',
  'CL' : 'Chile',
  'CN' : 'China',
  'CX' : 'Christmas Island',
  'CC' : 'Cocos (Keeling) Islands',
  'CO' : 'Colombia',
  'KM' : 'Comoros',
  'CG' : 'Congo',
  'CD' : 'Congo, Democratic Republic',
  'CK' : 'Cook Islands',
  'CR' : 'Costa Rica',
  'CI' : 'Cote D\'Ivoire',
  'HR' : 'Croatia',
  'CU' : 'Cuba',
  'CY' : 'Cyprus',
  'CZ' : 'Czech Republic',
  'DK' : 'Denmark',
  'DJ' : 'Djibouti',
  'DM' : 'Dominica',
  'DO' : 'Dominican Republic',
  'EC' : 'Ecuador',
  'EG' : 'Egypt',
  'SV' : 'El Salvador',
  'GQ' : 'Equatorial Guinea',
  'ER' : 'Eritrea',
  'EE' : 'Estonia',
  'ET' : 'Ethiopia',
  'FK' : 'Falkland Islands (Malvinas)',
  'FO' : 'Faroe Islands',
  'FJ' : 'Fiji',
  'FI' : 'Finland',
  'FR' : 'France',
  'GF' : 'French Guiana',
  'PF' : 'French Polynesia',
  'TF' : 'French Southern Territories',
  'GA' : 'Gabon',
  'GM' : 'Gambia',
  'GE' : 'Georgia',
  'DE' : 'Germany',
  'GH' : 'Ghana',
  'GI' : 'Gibraltar',
  'GR' : 'Greece',
  'GL' : 'Greenland',
  'GD' : 'Grenada',
  'GP' : 'Guadeloupe',
  'GU' : 'Guam',
  'GT' : 'Guatemala',
  'GG' : 'Guernsey',
  'GN' : 'Guinea',
  'GW' : 'Guinea-Bissau',
  'GY' : 'Guyana',
  'HT' : 'Haiti',
  'HM' : 'Heard Island & Mcdonald Islands',
  'VA' : 'Holy See (Vatican City State)',
  'HN' : 'Honduras',
  'HK' : 'Hong Kong',
  'HU' : 'Hungary',
  'IS' : 'Iceland',
  'IN' : 'India',
  'ID' : 'Indonesia',
  'IR' : 'Iran, Islamic Republic Of',
  'IQ' : 'Iraq',
  'IE' : 'Ireland',
  'IM' : 'Isle Of Man',
  'IL' : 'Israel',
  'IT' : 'Italy',
  'JM' : 'Jamaica',
  'JP' : 'Japan',
  'JE' : 'Jersey',
  'JO' : 'Jordan',
  'KZ' : 'Kazakhstan',
  'KE' : 'Kenya',
  'KI' : 'Kiribati',
  'KR' : 'Korea',
  'KW' : 'Kuwait',
  'KG' : 'Kyrgyzstan',
  'LA' : 'Lao People\'s Democratic Republic',
  'LV' : 'Latvia',
  'LB' : 'Lebanon',
  'LS' : 'Lesotho',
  'LR' : 'Liberia',
  'LY' : 'Libyan Arab Jamahiriya',
  'LI' : 'Liechtenstein',
  'LT' : 'Lithuania',
  'LU' : 'Luxembourg',
  'MO' : 'Macao',
  'MK' : 'Macedonia',
  'MG' : 'Madagascar',
  'MW' : 'Malawi',
  'MY' : 'Malaysia',
  'MV' : 'Maldives',
  'ML' : 'Mali',
  'MT' : 'Malta',
  'MH' : 'Marshall Islands',
  'MQ' : 'Martinique',
  'MR' : 'Mauritania',
  'MU' : 'Mauritius',
  'YT' : 'Mayotte',
  'MX' : 'Mexico',
  'FM' : 'Micronesia, Federated States Of',
  'MD' : 'Moldova',
  'MC' : 'Monaco',
  'MN' : 'Mongolia',
  'ME' : 'Montenegro',
  'MS' : 'Montserrat',
  'MA' : 'Morocco',
  'MZ' : 'Mozambique',
  'MM' : 'Myanmar',
  'NA' : 'Namibia',
  'NR' : 'Nauru',
  'NP' : 'Nepal',
  'NL' : 'Netherlands',
  'AN' : 'Netherlands Antilles',
  'NC' : 'New Caledonia',
  'NZ' : 'New Zealand',
  'NI' : 'Nicaragua',
  'NE' : 'Niger',
  'NG' : 'Nigeria',
  'NU' : 'Niue',
  'NF' : 'Norfolk Island',
  'MP' : 'Northern Mariana Islands',
  'NO' : 'Norway',
  'OM' : 'Oman',
  'PK' : 'Pakistan',
  'PW' : 'Palau',
  'PS' : 'Palestinian Territory, Occupied',
  'PA' : 'Panama',
  'PG' : 'Papua New Guinea',
  'PY' : 'Paraguay',
  'PE' : 'Peru',
  'PH' : 'Philippines',
  'PN' : 'Pitcairn',
  'PL' : 'Poland',
  'PT' : 'Portugal',
  'PR' : 'Puerto Rico',
  'QA' : 'Qatar',
  'RE' : 'Reunion',
  'RO' : 'Romania',
  'RU' : 'Russian Federation',
  'RW' : 'Rwanda',
  'BL' : 'Saint Barthelemy',
  'SH' : 'Saint Helena',
  'KN' : 'Saint Kitts And Nevis',
  'LC' : 'Saint Lucia',
  'MF' : 'Saint Martin',
  'PM' : 'Saint Pierre And Miquelon',
  'VC' : 'Saint Vincent And Grenadines',
  'WS' : 'Samoa',
  'SM' : 'San Marino',
  'ST' : 'Sao Tome And Principe',
  'SA' : 'Saudi Arabia',
  'SN' : 'Senegal',
  'RS' : 'Serbia',
  'SC' : 'Seychelles',
  'SL' : 'Sierra Leone',
  'SG' : 'Singapore',
  'SK' : 'Slovakia',
  'SI' : 'Slovenia',
  'SB' : 'Solomon Islands',
  'SO' : 'Somalia',
  'ZA' : 'South Africa',
  'GS' : 'South Georgia And Sandwich Isl.',
  'ES' : 'Spain',
  'LK' : 'Sri Lanka',
  'SD' : 'Sudan',
  'SR' : 'Suriname',
  'SJ' : 'Svalbard And Jan Mayen',
  'SZ' : 'Swaziland',
  'SE' : 'Sweden',
  'CH' : 'Switzerland',
  'SY' : 'Syrian Arab Republic',
  'TW' : 'Taiwan',
  'TJ' : 'Tajikistan',
  'TZ' : 'Tanzania',
  'TH' : 'Thailand',
  'TL' : 'Timor-Leste',
  'TG' : 'Togo',
  'TK' : 'Tokelau',
  'TO' : 'Tonga',
  'TT' : 'Trinidad And Tobago',
  'TN' : 'Tunisia',
  'TR' : 'Turkey',
  'TM' : 'Turkmenistan',
  'TC' : 'Turks And Caicos Islands',
  'TV' : 'Tuvalu',
  'UG' : 'Uganda',
  'UA' : 'Ukraine',
  'AE' : 'United Arab Emirates',
  'GB' : 'United Kingdom',
  'US' : 'United States',
  'UM' : 'United States Outlying Islands',
  'UY' : 'Uruguay',
  'UZ' : 'Uzbekistan',
  'VU' : 'Vanuatu',
  'VE' : 'Venezuela',
  'VN' : 'Viet Nam',
  'VG' : 'Virgin Islands, British',
  'VI' : 'Virgin Islands, U.S.',
  'WF' : 'Wallis And Futuna',
  'EH' : 'Western Sahara',
  'YE' : 'Yemen',
  'ZM' : 'Zambia',
  'ZW' : 'Zimbabwe',
  'ZZ' : 'Unknown',
};

function getCountryName (countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

function count(object, startNum, time=3000) {
  var $this = object
  console.log($this);
  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
    duration: time,
    easing: 'swing',
    step: function () {
      $this.text(Math.ceil(this.Counter));
    }
  });
};

async function getData() {
  await fetch('https://us-central1-claphelp-a1c4e.cloudfunctions.net/getClaps', {
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
  await fetch('https://us-central1-claphelp-a1c4e.cloudfunctions.net/addClap', {
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
  var url = 'https://us-central1-claphelp-a1c4e.cloudfunctions.net/addContact?' + $.param(formData);
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
  $toaster.html(msg);
  $toaster.fadeIn(fade_duration);
  $toaster.delay(fade_duration*5).fadeOut(fade_duration);
}

$(document).ready(function() {
  // 1) Start by retrieving the data from the dataset.
  getData().then(function() {
    // Once loaded, hide the loading icon and display the main view
    $('#loader').fadeOut(fade_duration);
    $('#main').delay(fade_duration).fadeIn(fade_duration);
      count($('#daily_claps'), 0);
  });

  // 2) Hook all buttons to actions and/or views

  $("#clap_button").click(function(e) {
    e.preventDefault();
    $('#main').fadeOut(fade_duration);
    sendClap();
    $('#dailymessage').delay(fade_duration).fadeIn(fade_duration);
    $('#results').find('.counter').each(function (i) {
      console.log($(this).text());
      count($(this), 0);
    });
  });

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
});

//PRE-LOADER
$(window).load(function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});
