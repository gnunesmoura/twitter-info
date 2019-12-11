const tweetsDao = require('./tweets-dao');

/**
 * Fuction to be used on a reduce, it adds a user to the array if it don't exist on the array.
 *
 * @param {object[]} uniqueUsers list of unique users.
 * @param {object} user user to be or not added to the list of unique users.
 * @returns {object[]} unoqueUsers list
 */
const uniqueUserReduceFn = (uniqueUsers, user) => (uniqueUsers.find(({ id }) => id === user.id)
  ? uniqueUsers : [...uniqueUsers, user]);

/**
 * Function that queries and filters all users on the tweets saved on DB.
 *
 * @param {number} numberOfUsers max number of users needed.
 * @returns {Promise<object[]>} most followed users.
 */
const mostFollowedUsers = numberOfUsers => tweetsDao.find()
  .then(tweets => tweets
    .map(tweet => tweet.toObject())
    .map(({ user }) => user)
    .reduce(uniqueUserReduceFn, [])
    .sort((a, b) => b.followers_count - a.followers_count)
    .slice(0, numberOfUsers));

module.exports = {
  mostFollowedUsers,
};
