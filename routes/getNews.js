const express = require('express');
const { query } = require('express-validator');

const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { getNewsUrl } = require('../utils/urls');

/* GET News for provided sources
* Expected parameters: sources (news source codes, such as cnn, lenta or techcrunch)
* Can contain multiple news sources
* */
router.get('/', query('sources').trim().escape(), async function f(req, res) {
  // Extract only required parameters from request query
  const { sources } = req.query;

  const response = await fetchNews(getNewsUrl, { sources });
  return res.json(response);
});

module.exports = router;
