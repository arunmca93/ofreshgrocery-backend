'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.State, { foreignKey:'country_id', as:'state'})
    }
  };
  Country.init({
    id:{
      type: INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true      
    },
    name:{
      type: STRING,
      allowNull:false
    },
    code:{
      type: STRING,
      allowNull:false 
    },
    mobileCode:{
      type: STRING,
      allowNull:false,
      field:'mobile_code'
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
    modelName: 'Country',
    tableName: 'country',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Country;
};