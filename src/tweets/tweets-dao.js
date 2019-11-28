const mongoose = require('mongoose');

const schema = new mongoose.Schema({}, { strict: false });
const Tweets = mongoose.model('Tweets', schema);

module.exports = Tweets;
