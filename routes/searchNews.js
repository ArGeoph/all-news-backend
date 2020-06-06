const express = require('express');
const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { searchNewsUrl } = require('../utils/urls');

/* Search for news based on user input
* Expected parameters: q (search query)
*
* */
router.get('/', async function f(req, res) {
  const response = await fetchNews(searchNewsUrl, req.query);
  res.json(response);
});

module.exports = router;
