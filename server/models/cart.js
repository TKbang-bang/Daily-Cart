"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      // Un carrito pertenece a un producto
      Cart.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.ENUM("active", "purchasing", "purchased"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
