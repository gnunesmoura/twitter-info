const nconf = require('nconf');
const logger = require('./logger');

/**
 * Hierarchical configuration with files, environment variables and command-line arguments.
 */

// 1º
nconf.overrides({
  service: {
    name: 'twitter-info',
  },
});

// 2º
nconf.argv();

// 3º
nconf.env();

nconf.required(['NODE_ENV']);
const isProduction = nconf.get('NODE_ENV') === 'production';

logger.info(`Service ${nconf.get('service:name')} started with NODE_ENV=${nconf.get('NODE_ENV')}`);

// 4º
if (nconf.get('configPath')) {
  nconf.file(`${nconf.get('configPath')}`);
  logger.info(`Using config file ${nconf.get('configPath')}`);
} else {
  logger.warn('configPath isn\'t setted');
  logger.warn('To set the config file use the argument --configPath=/path/to/config.json');
}

// 5º
nconf.defaults({
  port: 4000,
  database: {
    connectString: `mongodb://${isProduction ? 'mongo' : 'localhost'}:27017/twitter-info`,
  },
  twitter: {
    Authorization: 'Bearer <token>',
  },
});
module.exports = nconf;
