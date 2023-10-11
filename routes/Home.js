const express = require('express');
const router = express.Router();
const { Coffee } = require('../models/');
const { Op } = require('sequelize');

router.use(async (req, res, next) => {
    console.log("Time:", Date.now());
    next();
})

// Create Route
router.get('/', async (req, res) => {

  const coffeeList = await Coffee.findAll();

  const year = new Date().getFullYear();

  res.render('home', {
      coffee: coffeeList,
      year: year
  });
});

module.exports = router;