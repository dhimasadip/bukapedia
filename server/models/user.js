'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Name can't be empty`,
        },
        len: {
          args: [2, 30],
          msg: `Name must be 2-30 characters`,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Email can't be empty`
        },
        isEmail: {
          args: false,
          msg: `Wrong email format`
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Password can't be empty`,
        },
        len: {
          args: [8, 20],
          msg: `Password must be 8-20 characters`,
        },
      },
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = bcrypt.hashSync(instance.password, salt)
      },
    },
    sequelize });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: 'Carts'} )
  };

  return User;
};