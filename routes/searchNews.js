const express = require('express');
const { query } = require('express-validator');

const router = express.Router();
const fetchNews = require('../utils/fetchHelpers').fetchDataFromNewsApi;
const { searchNewsUrl } = require('../utils/urls');

/* Search for news based on user input
* Expected parameters: q (search query), sortBy (sorting parameter), pageSize (number of search results returned)
*
* */
router.get('/', [
    query('q').trim().escape(),
    query('sortBy').trim().escape(),
    query('pageSize').isNumeric().trim().escape()
  ], async function f(req, res) {
    // Extract only required parameters from the request query
    const { q, sortBy, pageSize } = req.query;

    const response = await fetchNews(searchNewsUrl, { q, sortBy, pageSize });
    return res.json(response);
});

module.exports = router;
