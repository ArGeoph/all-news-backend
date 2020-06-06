const express = require('express');
const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { topHeadlinesUrl } = require('../utils/urls');

/* Get top headlines for provided country code
* Expected parameters: country (country code, such as ca, us, fr, or ru)
*
* */
router.get('/', async function f(req, res) {
  const response = await fetchNews(topHeadlinesUrl, req.query);
  res.json(response);
});

module.exports = router;
