const Sequelize = require('sequelize');
const env = require('dotenv');

env.config();

const { DB_HOST } = process.env;
const { DB_PORT } = process.env;
const { DB_DATABASE } = process.env;
const { DB_USERNAME } = process.env;
const { DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
});

module.exports = sequelize;
