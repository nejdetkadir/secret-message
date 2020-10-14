const express = require('express');
const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
