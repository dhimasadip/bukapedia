'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Product name can't be empty`
        },
        len: {
          args: [2,30],
          msg: 'Product name must be 2-30 characters'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Category can't be empty`
        },
        len: {
          args: [2,20],
          msg: 'Category must be 2-20 characters'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Description can't be empty`
        },
        len: {
          args: [5,100],
          msg: 'Description must be 5-100 characters'
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Img url can't be empty`
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Price can't be empty`
        },
        isFloat: {
          args: false,
          msg: 'Wrong price format'
        },
        min: {
          args: 100,
          msg: `Price minimum 100`
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Stock can't be empty`
        },
        isInt: {
          args: false,
          msg: 'Wrong stock format'
        }
      }
    },
  }, { 
    hooks: {
      beforeCreate: (instance) => {
        if (instance.stock < 0) {
          instance.stock = 0
        }
      },
      beforeUpdate: (instance) => {
        if (instance.stock < 0) {
          instance.stock = 0
        }
      },
    },
    sequelize });

  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: 'Carts'} )
  };
  
  return Product;
};