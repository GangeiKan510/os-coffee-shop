const express = require('express');
const router = express.Router();
const { Cart_Items, Coffee } = require('../models/');

router.get('/', async (req, res) => {

  const cartItems = await Cart_Items.findAll()

  const year = new Date().getFullYear();
  let totalBill = 0;
  let deliveryCharge = 0;

  if (cartItems.length) {

    let deliveryCharge = 49;

    const totalBill = cartItems.map((result) => {
      deliveryCharge += deliveryCharge * result.quantity * .05
      return result.price * result.quantity
    }).reduce((accumulator, result) => {
      return accumulator + result;
    }) + deliveryCharge;
  
    res.render('cart', {
      cart: cartItems,
      year: year,
      totalBill: totalBill.toFixed(0),
      deliveryCharge: deliveryCharge.toFixed(2)
    });
  } else {
    res.render('cart', {
      cart: cartItems,
      year: year,
      totalBill: totalBill,
      deliveryCharge: deliveryCharge
    });
  }
})

// add to cart functionality
router.post('/add/:name/:price/', async (req, res) => {
  const params = req.params;

  const cartItem = await Cart_Items.build({
    name: params.name,
    price: params.price
  })

  cartItem.save();
  console.log("Coffee successfully added to Cart!");
});

router.post('/add-quantity/:id', async (req, res) => {

  const cartItemSelected = await Cart_Items.findAll({
    where: {
        id: req.params.id
    }
  });

  Cart_Items.update({ 
    quantity: cartItemSelected[0].quantity + 1
    }, {
    where: {
      id: req.params.id,
    },
  });
  res.redirect('/cart');
});

router.post('/subtract-quantity/:id', async (req, res) => {
  
  const cartItemSelected = await Cart_Items.findAll({
    where: {
        id: req.params.id
    }
  });

  if (cartItemSelected[0].quantity > 1) {
    Cart_Items.update({ 
      quantity: cartItemSelected[0].quantity - 1
      }, {
      where: {
        id: req.params.id,
      },
    });
  
    res.redirect('/cart');
  }
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