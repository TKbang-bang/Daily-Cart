"use strict";

const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Log, {
        foreignKey: "userId",
      });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      delete values.email;
      delete values.createdAt;
      delete values.updatedAt;
      return values;
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "moderator", "user"),
        allowNull: false,
        defaultValue: "user",
      },
      profile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeSave: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          user.email = user.email.toLowerCase();
        },
      },
    }
  );
  return User;
};
