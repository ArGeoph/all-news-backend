const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY;

/**
 * Fetch news from the server
 * @param apiUrl, params
 * @returns {Promise<any>}
 */
async function fetchDataFromNewsApi(apiUrl, params) {
    try {
        const payload = {
            params,
            headers: {
                'x-api-key': apiKey
            }
        };
        const response = await axios.get(apiUrl, payload);
        return response.data;
    } catch (e) {
        return e.response.data.message;
    }
}

exports.fetchDataFromNewsApi = fetchDataFromNewsApi;
