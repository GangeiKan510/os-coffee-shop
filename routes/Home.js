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

router.get('/search/:keyword', async (req, res) => {

  const keyword = req.params.keyword;

  try {
    const results = await Coffee.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } }
        ]
      }
    });
    
    res.render('home', {
      coffee: results
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;