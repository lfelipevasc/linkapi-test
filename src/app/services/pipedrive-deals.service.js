const axios = require('axios');
const token = process.env.PIPEDRIVE_TOKEN;

const connectApi = axios.create({
    baseURL: `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${token}`
});


module.exports = connectApi;

