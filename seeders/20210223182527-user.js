'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        nickname: 'Supser_Admin',
        phone_number: 00000000000,
        password: 'admin',
      },
    ];
    return queryInterface.bulkInsert('users', datas, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
