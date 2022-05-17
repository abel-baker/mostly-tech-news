// import Sequelize constructor
const Sequelize = require('sequelize');

require('dotenv').config();
console.log(`user: ${process.env.DB_USER}`);

// create connection to database, pass MySQL login info
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;