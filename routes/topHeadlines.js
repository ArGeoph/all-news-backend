const express = require('express');
const axios = require('axios');
const { query } = require('express-validator')

const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromApi;
const  apiKeyGeolocation = process.env.API_KEY_GEOLOCATION
const { geolocationApiUrl, topHeadlinesUrl } = require('../utils/urls');

/* Get top headlines for provided country code
* Expected parameters: country (country code, such as ca, us, fr, or ru)
* if the country code wasn't provided the route will try to determine the country using third-party API and user's IP
* */
router.get('/', query('country').trim().escape(), async function f(req, res) {
  // Extract only required parameters from request query
  let country = {
    'countryCode': req.query.country,
  };

  // If country code is not provided extract user IP address and get a country code from getCountryCode route
  if (!country.countryCode) {
    // Extract IP from the request headers
    const userIp = req.headers['X-Forwarded-For'] || req.ip;
    const payload = {
      'params': {
        'apiKey': apiKeyGeolocation,
        'ip': userIp,
      }
    };

    try {
      // Get country information from a third-party geolocaiton API
      const response = await axios.get(geolocationApiUrl, payload);

      if (typeof response !== 'string') {
        country = {
          'countryCode': response.country_code2,
          'countryName': response.country_name,
          'countryFlag': response.country_flag,
        };
      } else {
        throw new Error('Data returned in the incorrect format');
      }
    } catch (e) {
      // If we were unable to get country information from the geolocation API, use the default values
      console.log('I am here 2');
      country = {
        'countryCode': 'us',
        'countryName': 'The USA',
        'countryFlag': 'https://ipgeolocation.io/static/flags/us_64.png',
      }
    }
  }

  // Get headlines for the provided country code
  const response = await fetchNews(topHeadlinesUrl, { 'country': country.countryCode });
  return res.json({...response, ...country});
});

module.exports = router;
