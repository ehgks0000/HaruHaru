const Sequelize = require('sequelize');
const user = require('./user');
const answer = require('./answer');
const question = require('./question');
const character = require('./character');
const question_scheduler = require('./question_scheduler');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.User = user;
db.Answer = answer;
db.Character = character;
db.Question = question;
db.Question_scheduler = question_scheduler;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
