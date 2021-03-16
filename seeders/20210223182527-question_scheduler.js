'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [{ question_count: 1 }];
    return queryInterface.bulkInsert('questions_scheduler', datas, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
