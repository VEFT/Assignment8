'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const api = express();

/*
 *
 */
api.get('/companies', (req, res) => {
    models.Company.find({}, (err, docs) => {
        console.log(err);
        console.log(docs);
        if(err) {
            res.status(500).send(err);
            return;
        } else {
            res.send(docs);
        }
        res.send('ok');
    });
});

/*
 *
 */
api.get('/companies/:id', (req, res) => {
});

/*
 *
 */
api.post('/companies', (req, res) => {

});

/*
 *
 */
api.get('/users', (req, res) => {

});

/*
 *
 */
api.get('users/:id', (req, res) => {
});

/*
 *
 */
api.post('users', (req, res) => {
});


/*
 *
 */
api.post('punchcards/:company_id', (req, res) => {
});


/*
 *
 */
module.exports = api;
