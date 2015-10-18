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
 * If no company is found by the ID then this endpoint returns response
 * with status code 404. No authentication is needed for this endpoint.
 */
api.get('/companies/:id', (req, res) => {
    const id = req.params.id;

});

/* Allows administrators to add new companies to MongoDB.
 * The company is posted with a POST method and the data sent as a JSON object
 * within the request body.
 * This endpoint is authenticated using the ADMIN_TOKEN header.
 */
api.post('/companies', (req, res) => {
    const c = new models.Company(req.body);
    c.save(function(err, doc) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        else {
            res.send(doc);
            return;
        }
    })
});

/* Returns a list of all users that are in the MongoDB. This endpoint
 * is not authenticated and the token value within the user document
 * must be removed from the document before it is written to the response.
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
