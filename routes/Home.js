const express = require('express');
const router = express.Router();
const { Coffee } = require('../models/');
const { Op, Sequelize } = require('sequelize');

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

router.get('/:keyword', async (req, res) => {

  const keyword = req.params.keyword;

  const year = new Date().getFullYear();

  try {
    const results = await Coffee.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${keyword}%` // This is for case-insensitive search
        }
      }
    });
    res.render(
      'home', {
        coffee: results,
        year: year
      }
    )
  } catch (error) {
    throw new Error(error.message);
  }

});

module.exports = router;