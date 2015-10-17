'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const api = express();

/* Fetches a list of companies that have been added to MongoDB.
 * This endpoint uses no authentication.
 * If no company has been added this endpoint returns an empty list.
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

/* Fetches a given company that has been added to MongoDB by ID.
 * This endpoints returns a single JSON document if found.
 * If no company is found by the ID then this endpoint returns response with status code 404.
 * No authentication is needed for this endpoint.
 */
api.get('/companies/:id', (req, res) => {
    
});

/*
 *
 */
api.post('/companies', (req, res) => {
    const data = req.body;
    console.log(data);
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
