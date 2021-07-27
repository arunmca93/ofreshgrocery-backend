'use strict';
const { Model, STRING, INTEGER, BOOLEAN } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles, { foreignKey:'role_id', as:'roles' } )

      this.hasMany(models.Address, { foreignKey:'user_id', as:'address' } )
      this.hasMany(models.groceryShops, { foreignKey:'user_id', as:'grocery_shops' } )
      this.hasMany(models.groceryOrders, { foreignKey:'user_id', as:'grocery_orders' } )


    }
  };
  Users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    name:{
      type: STRING,
      allowNull:false
    },
    mobile:{
      type: STRING,
      allowNull:false
    },
    email:{
      type: STRING,
      allowNull:false
    },
    password:{
      type: STRING,
      allowNull:false
    },
    salt:{
      type: STRING,
      allowNull:false
    },
    emailVerified:{
      type: BOOLEAN,
      allowNull:false,
      field:'email_verified',
      defaultValue: false
    },
    mobileVerified:{
      type: BOOLEAN,
      allowNull:false,
      field:'mobile_verified',
      defaultValue: false
    },
    roleId:{
      type: INTEGER,
      allowNull:false,
      field:'role_id'
    },
    is_active:{
      type: BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    is_removed:{
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Users;
};