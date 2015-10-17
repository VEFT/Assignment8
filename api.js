'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const api = express();

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

// TODO! - More functions!

module.exports = api;
