const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Question extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        question: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },

        //Timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Question',
        tableName: 'questions',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Question.hasMany(db.Answer);
  }
};
