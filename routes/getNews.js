const express = require('express');
const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { getNewsUrl } = require('../utils/urls');

/* GET News for provided source */
router.get('/', async function f(req, res, next) {
  const response = await fetchNews(getNewsUrl, req.query);
  res.json(response);
});

module.exports = router;
