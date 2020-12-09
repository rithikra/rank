const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Company = new Schema({
    company_name: {
        type: String
    },
    company_logo: {
        type: Image
    },
    company_traits: {
        type: String
    },
    desirable_traits: {
        type: String
    },
    company_eloscore: {
        type: Number
    },
    company_ranking: {
        type: Number
    },
    past_rankings: {
        type: [Number]
    }
});

module.exports = mongoose.model('Company', Company);