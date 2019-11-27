// Making environment configuration with nconf and the database.
require('./env-config');
require('./db-config');
const { connection } = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./logger');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const { stream } = logger;

app.use(morgan('combined', { stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Set global response headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res) => {
  logger.err(err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Erro!' });
});

module.exports = app;
