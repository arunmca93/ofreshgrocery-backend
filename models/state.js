'use strict';
const {
  Model, INTEGER, STRING, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Country,{ foreignKey:'country_id', as:'country' })

      this.hasMany(models.City, { foreignKey:'state_id', as:'city' } )
    }
  };
  State.init({
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
    countryId:{
      type: INTEGER,
      allowNull:false,
      field:'country_id'
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
    modelName: 'State',
    tableName: 'state',
    createdAt:'created_at',
    updatedAt:'updated_at',
  });
  return State;
};