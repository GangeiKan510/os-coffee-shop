'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Coffees', [
      {
        name: 'Espresso',
        description: 'A concentrated form of coffee served in shots',
        price: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Americano',
        description: 'A shot of espresso with hot water added',
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Latte',
        description: 'A shot of espresso with steamed milk and a small layer of foam',
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cappuccino',
        description: 'A shot of espresso with equal parts steamed milk and foam',
        price: 170,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mocha',
        description: 'A shot of espresso with chocolate syrup and steamed milk',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Coffees', null, {})
  }
};