const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Character extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        level: {
          type: DataTypes.STRING(300), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        exp: {
          type: DataTypes.STRING(150),
          allowNull: false, // 필수
        },
        img: {
          type: DataTypes.STRING(150),
          allowNull: false, // 필수
        },

        //Timestamps
        // createdAt: DataTypes.DATE,
        // updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Character',
        tableName: 'characters',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Character.belongsTo(db.User);
  }
};
