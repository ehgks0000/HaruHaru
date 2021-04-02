const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
          unique: true, // 고유한 값
        },
        phone_number: {
          type: DataTypes.NUMBER(100),
          allowNull: false, // 필수
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        provider: {
          type: DataTypes.STRING(100),
          // allowNull: false, // 필수
          defaultValue: 'local',
        },
        provider_id: {
          type: DataTypes.STRING(100),
        },
        avatar: {
          type: DataTypes.STRING(100),
        },

        //Timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Answer, { through: 'Like', as: 'Liked' });
    db.User.hasOne(db.Character);

    db.User.hasMany(db.Answer);

    // db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    // db.User.belongsToMany(db.User, {
    //   through: 'Follow',
    //   as: 'Followers',
    //   foreignKey: 'FollowingId',
    // });
    // db.User.belongsToMany(db.User, {
    //   through: 'Follow',
    //   as: 'Followings',
    //   foreignKey: 'FollowerId',
    // });
  }
};
