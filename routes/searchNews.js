const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const { searchNewsUrl } = require('../utils/urls');

/* Search for news based on user input */
router.get('/', async function f(req, res, next) {
    const response = await searchNews(req.query);
    res.json(response);
});

/* Helper methods */
/**
 * Search news from the server
 * @param params
 * @returns {Promise<any>}
 */
async function searchNews(params) {
    try {
        const payload = {
            params,
            headers: {
                'x-api-key': apiKey
            }
        };
        const response = await axios.get(searchNewsUrl, payload);
        return response.data;
    } catch (e) {
        return e;
    }
}

module.exports = router;
