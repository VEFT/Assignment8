'use strict';

const express = require('express');
const api = require('./api');
const mongoose = require('mongoose');
const port = 4000;
const app = express();

// Direct all request with the prefix 'api' to 'api.js'.
app.use('/api', api);

// Connect to MongoDB
mongoose.connect('localhost/assignment8');
mongoose.connection.once('open', () => {
    console.log('mongoose is connected');
    app.listen(port, () => {
        console.log('Server is on port:', port);
    });
});

