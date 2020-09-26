const Opportunity = require('../models/Opportunity');

const blingApi = require('../services/bling.service');
const pipedriveApi = require('../services/pipedrive-deals.service');

const blingXml = require('../utils/bling-xml.util');


class OpportunityController{
    async create(req, res) {
        const wonDeals = await pipedriveApi.get();
        const { data } = wonDeals.data;

        if(!data) {
            return res.status(400).json({message: 'Pipedrive no returned Deals'});
        }

        const dealInfos = data.map(({id, title, value, won_time}) => ({
            id, title, value, won_time
        })
        );

        try {
            for(const deal of dealInfos) {
                const {title, value, won_time} = deal;
    
                const createOpportunity = Opportunity.create({
                    title, value, won_time
                });
    
                const xml = blingXml(title, value);
                const createBlingOrder = await blingApi.post(`pedido/json/?apikey=${process.env.BLING_TOKEN}&xml=${encodeURI(xml)}`);
            }

            return res.status(200).json({message: 'Integration Success'});
        } catch(err) {
            return res.status(401).json({message: 'API Internal Error'});
        }
    }
    
    async show(req, res) {
        const opportunities = await Opportunity.find({});

        if (!opportunities){
            return res.status(404).json({message: 'No results on database'});
        }

        return res.json(opportunities);
    }
}

module.exports = new OpportunityController();