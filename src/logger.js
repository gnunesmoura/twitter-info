const nconf = require('nconf');
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const { createLogger, format, transports } = winston;

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: 'http://elasticsearch:9200',
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
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'twitter-info' },
  transports: nconf.get('NODE_ENV') === 'production' ? [
    new transports.File({ filename: './log/quick-start-error.log', level: 'error' }),
    new transports.File({ filename: './log/quick-start-combined.log' }),
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
