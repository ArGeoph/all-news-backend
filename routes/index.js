const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const { newsUrl } = require('../utils/urls');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET News for provided source */
router.get('/getNews', async function f(req, res, next) {
  const response = await getNews(req.query);
  res.send(response);
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
    const response = await axios.get(newsUrl, payload);
    return response.data;
  } catch (e) {
    return e;
  }
}

module.exports = router;
