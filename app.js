const express = require('express');
const bodyParser = require('body-parser');

const {sequelize, Coffee} = require('./models');

const app = express();

// exporting routes
const coffee = require('./routes/Coffee');
const cartItems = require('./routes/Cart');
const home = require('./routes/Home');

app.set('view engine', 'ejs');

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/home', home);
app.use('/coffee', coffee)
app.use('/cart', cartItems);

app.listen(3000, async () => {
    console.log('Example app listening on port 3000!');
    sequelize.authenticate() 
    await sequelize.sync();
    console.log('Database connected!')
});