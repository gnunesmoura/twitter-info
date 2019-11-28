const nconf = require('nconf');
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const { createLogger, format, transports } = winston;

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: 'http://127.0.0.1:9200',
    auth: {
      username: 'elastic',
      password: 'asdf1234',
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
  },
};

const logger = createLogger({
  level: 'info',
  transports: nconf.get('NODE_ENV') === 'production' ? [
    new Elasticsearch(esTransportOpts),
  ] : [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
