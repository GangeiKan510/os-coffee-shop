const express = require('express');
const bodyParser = require('body-parser');

const {sequelize, Coffee} = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const cart = [];

// Home Route
app.route('/')
.get(async (req, res) => {

    const coffeeList = await Coffee.findAll();

    res.render('home', {
        coffee: coffeeList
    });
});

// Create Route
app.route('/create')
.get(async (req, res) => {
    res.render('create')
})
.post(async (req, res) => {

    coffeeDetails = req.body

    const coffee = await Coffee.build(coffeeDetails);
    await coffee.save();
    console.log("Coffee saved successfully to DB!")
    res.redirect('/')
});

// Update Route
app.route('/update')
.get(async (req, res) => {
    const coffeeList = await Coffee.findAll();

    res.render('update', {
        coffee: coffeeList
    });
})

app.route('/update/:coffeeName')
.get(async (req, res) => {

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
.post( async (req, res) => {
    try {
        await Coffee.update({ name: req.body.name }, {
            where: {
              name: req.params.coffeeName,
            },
          });

          res.redirect('/');
    } catch (error) {
        res.send(error);
    }
});

// Route to Delete
app.route('/delete')
.get( async(req, res) => {
    res.render('delete');
})
.post(async (req, res) => {
    try {
        await Coffee.destroy({
            where: {
                name: req.body.name
            }
        })
        res.redirect('/');
    } catch (error) {
        res.status(error.status);
    }
});

app.listen(3000, async () => {
    console.log('Example app listening on port 3000!');
    sequelize.authenticate() 
    await sequelize.sync();
    console.log('Database connected!')
});