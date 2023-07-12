const { Sequelize, DataTypes } = require("sequelize");
const { v4: uunidv4 } = require("uuid");
require("dotenv").config();

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

const CollectionModel = sequelize.define("collection", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uunidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorRole: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CollectionModel;
