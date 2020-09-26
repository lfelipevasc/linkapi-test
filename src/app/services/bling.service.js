const axios = require('axios');

const connectApi = axios.create({
    baseURL:'https://bling.com.br/Api/v2'
});

module.exports = connectApi;