'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
});

const CompanySchema = mongoose.Schema({
});

const PunchcardSchema = mongoose.Schema({
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Company: mongoose.model('Company', CompanySchema),
    Punchcard: mongoose.model('Punchcard', PunchcardSchema)
};
