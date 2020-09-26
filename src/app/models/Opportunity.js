const {Schema, model} = require('mongoose');

const OpportunitySchema = new Schema({
    title: {type: String, required: true},
    value: {type: Number, required: true},
    won_time: {type: Date, required: true},
});

module.exports = model('opportunities', OpportunitySchema);