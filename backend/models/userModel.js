const { Sequelize, DataTypes } = require("sequelize");
const { v4: uunidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uunidv4(),
      primaryKey: true,
    },
    name: {
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "regular",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

UserModel.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// Export the User model
module.exports = UserModel;
