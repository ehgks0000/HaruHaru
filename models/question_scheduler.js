const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Question_scheduler extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        question_count: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },

        //Timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Question_scheduler',
        tableName: 'questions_scheduler',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    // db.Question.hasMany(db.Answer);
  }
};
