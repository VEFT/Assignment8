'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const port = 4000;
const app = express();
app.use(bodyParser.json());

const companies = [];
const users = [];

app.listen(port, () => {
    console.log('Server is on port:', port);
});

/*
 * Returns a list of all registered companies.
 */
app.get('/api/companies', (req, res) => {
    res.status(200).send(companies);
});

/*
 * Adds a new company. The required properties are "name" and "punchCount",
 * indicating how many punches a user needs to collect in order to get a discount.
 */
app.post('/api/companies', (req, res) => {
    const company = req.body;

    if(!company.hasOwnProperty('name')) {
        res.status(412).send('missing name');
        return;
    }
    if(!company.hasOwnProperty('punchCount')) {
        res.status(412).send('missing punchCount');
        return;
    }

    company.id = companies.length;

    companies.push(company);
    res.status(201).send(company);
});

/*
 * Returns a given company by id.
 */
app.get('/api/companies/:id', (req, res) => {
    const id = req.params.id;
    const company = _.find(companies, (company) => {
        return company.id == id;
    });

    if(!company) {
        res.status(404).send('company not found');
        return;
    }

    res.status(200).send(company);
});

/*
 * Returns a list of all users.
 */
app.get('/api/users', (req, res) => {
    res.status(200).send(users);
});

/*
 * Adds a new user to the system. The following properties must be specified: name, email.
 */
app.post('/api/users', (req, res) => {
    const user = req.body;

    if(!user.hasOwnProperty('name')) {
        res.status(412).send('missing name');
        return;
    }
    if(!user.hasOwnProperty('email')) {
        res.status(412).send('missing email');
        return;
    }

    user.id = users.length;
    user.punches = [];

    users.push(user);
    res.status(201).send(user);
});

/*
 * Returns a list of all punches registered for the given user.
 * Each punch contains information about what company it was added to,
 * and when it was created.
 * It is be possible to filter the list by adding a "?company={id}" to the query.
 */
app.get('/api/users/:id/punches', (req, res) => {
    const queryCompanyId = req.query.company;
    const punches = [];
    const id = req.params.id;
    const user = _.find(users, (user) => {
        return user.id == id;
    });

    if(!user) {
        res.status(404).send('user not found');
        return;
    }

    if(!queryCompanyId) {
        _.find(user.punches, (punch) => {
            _.find(companies, (company) => {
                if(punch.companyId == company.id) {
                    const p = {};
                    p.companyName = company.name;
                    p.timestamp = punch.timestamp;
                    punches.push(p);
                }
            });
        });
    }
    else {
        _.find(user.punches, (punch) => {
            if(punch.companyId == queryCompanyId) {
                _.find(companies, (company) => {
                    if(punch.companyId == company.id) {
                        const p = {};
                        p.companyName = company.name;
                        p.timestamp = punch.timestamp;
                        punches.push(p);
                    }
                });
            }
        });
    }

    res.status(200).send(punches);
});

/*
 * Adds a new punch to the user account. The only information needed is the id of the company.
 */
app.post('/api/users/:id/punches', (req, res) => {
    const punch = req.body;
    const id = req.params.id;

    if(!punch.hasOwnProperty('companyId')) {
        res.status(412).send('missing company id');
        return;
    }

    const user = _.find(users, (user) => {
        return user.id == id;
    });

    const company = _.find(companies, (company) => {
        return company.id == punch.companyId;
    });

    if(!user) {
        res.status(404).send('user not found');
        return;
    }
    if(!company) {
        res.status(404).send('company not found');
        return;
    }

    punch.timestamp = new Date();

    user.punches.push(punch);
    res.status(201).send(user.punches);
});

