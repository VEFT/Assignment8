'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const api = express();
const ADMIN_TOKEN = "ADMIN_TOKEN";
const VALIDATION_ERROR_NAME = "ValidationError";
const NOT_FOUND_ERROR_MESSAGE = "NotFound";
const UNAUTHORIZED_ERROR_MESSAGE = "Unauthorized";

/* Fetches a list of companies that have been added to MongoDB.
 * This endpoint uses no authentication.
 * If no company has been added this endpoint returns an empty list.
 */
api.get('/companies', (req, res) => {
    models.Company.find({}, (err, docs) => {
        if(err) {
            res.status(500).send(err.name);
        } else {
            res.status(200).send(docs);
        }
    });
});

/* Fetches a given company that has been added to MongoDB by ID.
 * This endpoints returns a single JSON document if found.
 * If no company is found by the ID then this endpoint returns response
 * with status code 404. No authentication is needed for this endpoint.
 */
api.get('/companies/:id', (req, res) => {
    const id = req.params.id;
    models.Company.findOne({ _id : id }, (err, docs) => {
        if(err) {
            res.status(500).send(err.name);
        } else if(!docs) {
            res.status(404).send(NOT_FOUND_ERROR_MESSAGE);
        } else {
            console.log(docs);
            res.status(200).send(docs);
        }
    });
});

/* Allows administrators to add new companies to MongoDB.
 * The company is posted with a POST method and the data sent as a JSON object
 * within the request body.
 * This endpoint is authenticated using the ADMIN_TOKEN header.
 */
api.post('/companies', bodyParser.json(), (req, res) => {
    const token = req.headers.authorization;
    if(!token || token !== ADMIN_TOKEN) {
        res.status(401).send(UNAUTHORIZED_ERROR_MESSAGE);
    } else {
        const c = new models.Company(req.body);
        c.save(function(err, doc) {
            if (err) {
                if(err.name === VALIDATION_ERROR_NAME) {
                    res.status(412).send(err.name);
                } else {
                    res.status(500).send(err.name);
                }
            } else {
                res.status(201).send(doc);
            }
        })
    }
});

/* Returns a list of all users that are in the MongoDB. This endpoint
 * is not authenticated and the token value within the user document
 * must be removed from the document before it is written to the response.
 */
api.get('/users', (req, res) => {
    models.User.find({}, (err, docs) => {
        if(err) {
            res.status(500).send(err.name);
        } else {
            res.status(200).send(docs);
        }
    });
});

/*
 *
 */
api.get('/users/:id', (req, res) => {
    const id = req.params.id;
    models.User.findOne({ _id : id }, (err, docs) => {
        if(err) {
            res.status(500).send(err.name);
        } else if(!docs) {
            res.status(404).send(NOT_FOUND_ERROR_MESSAGE);
        } else {
            res.status(200).send(docs);
        }
    });
});

/*
 *
 */
api.post('/users', bodyParser.json(), (req, res) => {
    const token = req.headers.authorization;
    if(!token || token !== ADMIN_TOKEN) {
        res.status(401).send(UNAUTHORIZED_ERROR_MESSAGE);
    } else {
        const u = new models.User(req.body);
        u.save(function(err, doc) {
            if (err) {
                if(err.name === VALIDATION_ERROR_NAME) {
                    res.status(412).send(err.name);
                } else {
                    res.status(500).send(err.name);
                }
            } else {
                res.status(201).send(doc);
            }
        })
    }
});

/*
 *
 */
api.post('/punchcards/:company_id', (req, res) => {
    console.log("FIRST THING FIRST: ", req.body);
    const token = req.headers.authorization;
    if(!token) {
        res.status(401).send();
    } else {
        models.User.findOne({ token : token }, (err, docs) => {
            if(err) {
                res.status(500).send(err.name);
            } else if(!docs) {
                res.status(401).send(UNAUTHORIZED_ERROR_MESSAGE);
            } else {
                const user_id = docs._id;
                const id = req.params.company_id;
                console.log("req.body: ");
                models.Company.findOne({ _id : id }, (err, docs) => {
                    if(err) {
                        res.status(500).send(err.name);
                    } else if(!docs) {
                        res.status(404).send(NOT_FOUND_ERROR_MESSAGE);
                    } else {
                        /*
                        const p = new models.Punchcard(req.body);
                        p.save(function(err, doc) {
                            if (err) {
                                if(err.name === VALIDATION_ERROR_NAME) {
                                    res.status(412).send(err.name);
                                } else {
                                    res.status(500).send(err.name);
                                }
                            } else {
                                res.status(201).send(doc);
                            }
                        })
                        */
                    }
                });
            }
        });
    }

    /*const token = req.headers.authorization;
    if(!token) {
        res.status(401).send();
        return;
    } else {
        models.User.findOne({ token : token }, (err, docs) => {
            if(err) {
                res.status(500).send(err.name);
                return;
            } else if(!docs) {
                res.status(401).send(UNAUTHORIZED_ERROR_MESSAGE);
                return;
            } else {
                const user_id = docs._id;
            }
        });
    }

    const id = req.params.id;
    models.Company.findOne({ _id : id }, (err, docs) => {
    console.log("USER_ID", user_id);
        if(err) {
            res.status(500).send(err.name);
        } else if(!docs) {
            res.status(404).send(NOT_FOUND_ERROR_MESSAGE);
        } else {
            console.log(docs);
            res.status(200).send(docs);
        }
    });
    *(

    /*
    const p = new models.Punchcard(req.body);
    p.save(function(err, doc) {
        if (err) {
            if(err.name === VALIDATION_ERROR_NAME) {
                res.status(412).send(err.name);
            } else {
                res.status(500).send(err.name);
            }
        } else {
            res.status(201).send(doc);
        }
    })
    */
});

module.exports = api;
