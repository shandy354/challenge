'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

        User.belongsToMany(models.Role,{
          through:'UserRole',
          as:'Roles',
          foreignKey:'userId'
        });
        // User.belongsTo(models.userBiodata,{
        //   as:'userBiodata',
        //   foreignKey:'userId'
        // });

    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};