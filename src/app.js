require('dotenv').config();
const express = require('express');
const asyncerror = require('express-async-errors');
const routes = require ('./routes');
require('./database');


class App{
    constructor(){
        this.server = express();
        this.routes();
    }
    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;