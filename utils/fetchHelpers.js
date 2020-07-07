const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY_NEWS;

/**
 * Fetch news from the server
 * @param apiUrl
 * @param params
 * @returns {Promise<any>}
 */
async function fetchDataFromApi(apiUrl, params) {
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

exports.fetchDataFromApi = fetchDataFromApi;
