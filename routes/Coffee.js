const express = require('express');
const router = express.Router();
const { Coffee } = require('../models/');

router.use(async (req, res, next) => {
    console.log("Time:", Date.now());
    next();
})

// Create Route
router.get('/create', async (req, res) => {
    res.render('create')
})
router.post('/create', async (req, res) => {

    coffeeDetails = req.body

    const coffee = await Coffee.build(coffeeDetails);
    await coffee.save();
    console.log("Coffee saved successfully to DB!");
    res.redirect('/coffee/list');
});

// Update Route
router.get('/list', async (req, res) => {
    const coffeeList = await Coffee.findAll();

    res.render('coffee-list', {
        coffee: coffeeList
    });
})


router.get('/list/:coffeeName', async (req, res) => {

    const coffeeSelected = await Coffee.findAll({
        where: {
            name: req.params.coffeeName
        }
    });
    console.log("Coffee selected:", coffeeSelected);
    res.render('update-form', {
        coffee: coffeeSelected
    });
})

router.post('/list/:coffeeName', async (req, res) => {
    try {
        await Coffee.update({ 
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }, {
            where: {
              name: req.params.coffeeName,
            },
          });

          res.redirect('/coffee/list');
    } catch (error) {
        res.send(error);
    }
});

// Route to Delete
router.post('/list/delete/:coffeeId', (async (req, res) => {
    try {
        await Coffee.destroy({
            where: {
                id: req.params.coffeeId
            }
        })
        res.redirect('/coffee/list');
    } catch (error) {
        res.status(error.status);
    }
}));

module.exports = router;