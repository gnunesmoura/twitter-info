const nconf = require('nconf');
const axios = require('axios').default;
const urlencode = require('urlencode');

const Authorization = nconf.get('twitter:Authorization');

const instance = axios.create({
  baseURL: 'https://api.twitter.com',
  timeout: 1000,
  headers: {
    Authorization,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  withCredentials: true,
});

/**
 * Function that create the params to search tweets based on a HashTag.
 *
 * @param {string} tag tag of interest.
 * @returns { { params: { q: string, result_type: string, count: number } } } object
 * with the params.
 */
const searchParams = tag => ({
  params: {
    q: urlencode(`#${tag}`),
    result_type: 'recent',
    count: 100,
  },
});

/**
 * Function that validate if a tweet have an exact HashTag.
 *
 * @param { { entities: { hashtags: [ {text: string } ] } } } tweet statuse object from Twitte API
 * @param {string} tag tag of interest.
 * @returns {boolean} true if a tweet have an exact HashTag, otherwise false.
 */
const haveExactTag = (tweet, tag) => {
  const { hashtags } = tweet.entities;
  return hashtags.find(({ text }) => text === tag) ? true : false;
};

/**
 * Search a list of tweets on the Twitter API.
 *
 * @param {string} tag Hastag to be searched.
 * @returns {Promise<object[]>} Tweets list
 */
const searchByTag = async (tag) => {
  const response = await instance.get('/1.1/search/tweets.json', searchParams(tag));
  return response.data.statuses
    .filter(statuse => haveExactTag(statuse, tag));
};

module.exports = {
  searchByTag,
  haveExactTag,
  searchParams,
};
