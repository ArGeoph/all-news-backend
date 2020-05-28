const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const { getNewsUrl } = require('../utils/urls');


/* GET News for provided source */
router.get('/', async function f(req, res, next) {
  const response = await getNews(req.query);
  res.json(response);
});


/* Helper methods */
/**
 * Fetch news from the server
 * @param params
 * @returns {Promise<any>}
 */
async function getNews(params) {
  try {
    const payload = {
      params,
      headers: {
        'x-api-key': apiKey
      }
    };
    const response = await axios.get(getNewsUrl, payload);
    return response.data;
  } catch (e) {
    return e.response.data.message;
  }
}

module.exports = router;
