var mongoose = require('mongoose');
var router = require('express').Router();

var Company = mongoose.model('Company');


router.route('/add').post(function(req, res) {
    let company = new Company(req.body);
    company.save()
        .then(company => {
            res.status(200).json({'company': 'company added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new company failed');
        });
});

module.exports = router;
