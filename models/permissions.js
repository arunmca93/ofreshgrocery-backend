'use strict';
const { Model, STRING, BOOLEAN, INTEGER } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Roles, { through: 'roles_permissions_rel', timestamps:false })
    }
  };
  Permissions.init({
    id:{
      type: INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    name:{
      type: STRING,
      allowNull: false
    },
    code:{
      type: STRING,
    },
    is_active:{
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    is_removed:{
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Permissions',
    tableName: 'permissions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Permissions;
};