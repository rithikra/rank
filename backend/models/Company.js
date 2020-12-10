const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Company = new Schema({
    _id:{
        type: Number
    },
    company_name: {
        type: String
    },
    company_logo: {
        type: String
    },
    company_information: {
        type: String
    },
    company_traits: {
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