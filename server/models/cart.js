'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id' })
      Cart.belongsTo(models.Product, { foreignKey: 'ProductId', targetKey: 'id' })
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.status = 'unpaid'
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};