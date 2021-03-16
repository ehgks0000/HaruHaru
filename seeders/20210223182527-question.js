'use strict';

const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csv = fs.readFileSync(path.join(__dirname + '/1.csv'));
    // const csv = fs.readFileSync(path.join(__dirname + '/1.csv'));
    const records = parse(csv.toString(), {
      skip_empty_lines: true,
      delimiter: '=>',
      //   quote: '"',
      escape: '\\',
      ltrim: true,
      rtrim: true,
    });
    let datas = [];
    records.forEach((e, i) => {
      datas.push({ question: e });
    });
    return queryInterface.bulkInsert('questions', datas, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
