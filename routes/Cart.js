const express = require('express');
const router = express.Router();
const { Cart_Items, Coffee } = require('../models/');

router.get('/', async (req, res) => {

  const cartItems = await Cart_Items.findAll()

  const year = new Date().getFullYear();

  const totalBill = cartItems.map((result) => {
    return result.price
  }).reduce((accumulator, result) => {
    return accumulator + result;
  })

  res.render('cart', {
    cart: cartItems,
    year: year,
    totalBill: totalBill
  });
})

// add to cart functionality
router.post('/add/:name/:price', async (req, res) => {
  const params = req.params;

  const cartItem = await Cart_Items.build({
    name: params.name,
    price: params.price
  })

  cartItem.save();
  console.log("Coffee successfully added to Cart!");
});

//delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Cart_Items.destroy({
        where: {
            id: req.params.id
        }
    })
      res.redirect('/cart');
    } catch (error) {
      res.status(error.status);
    }
});

module.exports = router;