const express = require('express');

const companyRoutes = require('./routes/companies');

const app = express();

app.use(express.static('src/public'));
app.use(express.json());

app.use('/companies', companyRoutes);

module.exports = app;