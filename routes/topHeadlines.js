const express = require('express');
const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { topHeadlinesUrl } = require('../utils/urls');
const { query } = require('express-validator')

/* Get top headlines for provided country code
* Expected parameters: country (country code, such as ca, us, fr, or ru)
*
* */
router.get('/', query('country').trim().escape(), async function f(req, res) {
  // Extract only required parameters from request query
  const { country } = req.query;

  const response = await fetchNews(topHeadlinesUrl, { country });
  return res.json(response);
});

module.exports = router;
