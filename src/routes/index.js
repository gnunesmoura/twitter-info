const express = require('express');
const tweets = require('../tweets');

const router = express.Router();

router.get('/fiveMostFollowed', (req, res, next) => {
  tweets.queries.mostFollowedUsers(5)
    .then(users => res.status(200).send({ users }))
    .catch(err => res.status(500).send({ err }));
});

module.exports = router;
