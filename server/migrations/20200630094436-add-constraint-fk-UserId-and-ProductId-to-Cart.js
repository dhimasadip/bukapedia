'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(() => {
      return queryInterface.addConstraint('Carts', {
        fields: ['ProductId'],
        type: 'foreign key',
        name: 'custom_fkey_ProductId',
        references: { 
          table: 'Products',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'custom_fkey_UserId', {})
    .then(() => {
      return queryInterface.removeConstraint('Carts', 'custom_fkey_ProductId', {})
    })
  }
};
