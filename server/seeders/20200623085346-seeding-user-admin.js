'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    const hashPassword = bcrypt.hashSync('1234', salt)

    const admin = [{
      name: 'Admin',
      email: 'admin@mail.com',
      password: hashPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    return queryInterface.bulkInsert('Users', admin, {});
  },

  down: (queryInterface, Sequelize) => {
 
    return queryInterface.bulkDelete('Users', null, {});
  }
};
