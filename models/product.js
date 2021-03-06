'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    image_url: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : true,
        min : 1
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : true,
        min : 1
      }
    },
    CategoryId : {
      type : DataTypes.INTEGER,
      references : {
        model : "Categories",
        key : "id"
      },
      onDelete : "cascade",
      onUpdate : "cascade",
    }
  }, {
    sequelize,
    modelName : "Product"
  });
  Product.associate = function(models) {
    Product.belongsTo(models.Category);
    Product.belongsToMany(models.User, {through: 'Transactions'})
  };
  return Product;
};