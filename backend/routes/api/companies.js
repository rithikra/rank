var mongoose = require('mongoose');
var company_router = require('express').Router();
const cors = require('cors');

var Company = mongoose.model('Company');


//GET Companies sorted by rank
company_router.route('/sorted').get(function(req, res) {
    Company.find({}).sort({company_eloscore: -1}).exec((err, sorted) =>{
        if(err){
            res.send(err);
        }
        else{
            res.send(sorted);
        }
    });
});

//GET Number of Companies
company_router.route('/count').get(function(req, res) {
    Company.countDocuments( {}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
   });
});


//POST Add Company
company_router.route('/add').post(function(req, res) {
    let company = new Company(req.body);
    company.save()
        .then(company => {
            res.status(200).json({'company': 'company added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new company failed');
        });
});



company_router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Company.findById(id, function(err, company) {
        res.json(company);
    });
});


company_router.route('/update/:id').post(function(req, res) {
    Company.findById(req.params.id, function(err, company) {
        if (!company){
            res.status(404).send("data is not found");
        }
        else{
            company.company_name = req.body.company_name;
            company.company_logo = req.body.company_logo;
            company.company_traits = req.body.company_traits;
            company.desirable_traits = req.body.desirable_traits;
            company.company_eloscore = req.body.company_eloscore;
            company.company_ranking = req.body.company_ranking;
            company.past_rankings = req.body.past_rankings;

            company.save().then(company => {
                res.json('Company updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

module.exports = company_router;
