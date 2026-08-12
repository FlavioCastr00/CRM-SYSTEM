const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static('src/public'));

const companyRoutes = require('./routes/companies');
app.use('/companies', companyRoutes);

const categoriesRoutes = require('./routes/categories');
app.use('/categories', categoriesRoutes);

module.exports = app;