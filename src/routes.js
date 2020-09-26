const {Router} = require('express');
const OpportunityController = require('./app/controllers/OpportunityController');
const routes = new Router();

routes.get('/deals', OpportunityController.create);
routes.get('/opportunities', OpportunityController.show);

module.exports = routes;