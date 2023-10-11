const express = require('express');
const router = express.Router();
const { Coffee } = require('../models/');

router.use(async (req, res, next) => {
    console.log("Time:", Date.now());
    next();
})

// Create Route
router.get('/', async (req, res) => {

  const coffeeList = await Coffee.findAll();

  res.render('home', {
      coffee: coffeeList
  });
});

router.post('/search/:key', async (req, res) => {
  const key = req.params.key;
});



module.exports = router;