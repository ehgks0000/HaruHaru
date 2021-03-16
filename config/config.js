const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'HaRu_HaRU',
    port: '3306',
    host: 'mysql',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'HaRu_HaRu',
    host: 'mysql',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'HaRu_HaRu',
    host: 'mysql',
    port: '3306',
    dialect: 'mysql',
  },
};
