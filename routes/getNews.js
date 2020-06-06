const express = require('express');
const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { getNewsUrl } = require('../utils/urls');

/* GET News for provided source
* Expected parameters: sources (news source code, such as cnn, lenta or techcrunch)
*
* */
router.get('/', async function f(req, res) {
  const response = await fetchNews(getNewsUrl, req.query);
  res.json(response);
});

module.exports = router;
