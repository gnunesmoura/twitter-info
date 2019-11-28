const bluebird = require('bluebird');
const { flatten } = require('lodash');
const logger = require('../logger');
const Tweets = require('./tweets-dao');
const { searchByTag } = require('./search');
const queries = require('./queries');
const { humanArrayToString } = require('../utils/string');

const hashtags = [
  'openbanking',
  'apifirst',
  'devops',
  'cloudfirst',
  'microservices',
  'apigateway',
  'oauth',
  'swagger',
  'raml',
  'openapis',
];

/**
 * Search and save new tweets based on the tags array.
 * The search is madeon the Twitter API for the last 100 tweets from each tag of the tags array.
 * All tweets that do not exist in the database are saved.
 *
 * @param {string[]} tags HashTags to be searched.
 */
const searchTagsAndSave = async tags => bluebird.Promise
  .mapSeries(tags, searchByTag)
  .then(flatten)
  .then(statuses => bluebird.Promise.mapSeries(statuses, async (statuse) => {
    const savedTweet = await Tweets.findOne({ id_str: statuse.id_str });
    if (!savedTweet) {
      return new Tweets(statuse).save();
    }
    return null;
  }))
  .then(() => logger.info(`Search of tags${humanArrayToString(tags)} finished`))
  .catch(err => logger.error(err));

searchTagsAndSave(hashtags);
setInterval(() => searchTagsAndSave(hashtags), 5 * 1000 * 60);

module.exports = {
  queries,
};
