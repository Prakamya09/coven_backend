const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // get posts
  res.json([{ title: "Welcome to the Coven", author: "Admin" }]);
});

router.post('/', (req, res) => {
  // add post
  res.send('Post added!');
});

module.exports = router;
