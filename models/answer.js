const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Answer extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        content: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        emotion: {
          type: DataTypes.STRING(150),
          allowNull: false, // 필수
        },

        //Timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Answer',
        tableName: 'answers',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Answer.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Answer.belongsTo(db.Question);

    db.Answer.belongsTo(db.User);
  }
};
