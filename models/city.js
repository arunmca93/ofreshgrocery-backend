'use strict';
const {
  Model, INTEGER, STRING, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.State,{ foreignKey:'state_id', as:'state' })

      this.hasMany(models.Address, { foreignKey:'city_id', as:'address' } )
    }
  };
  City.init({
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
    stateId:{
      type: INTEGER,
      allowNull:false,
      field:'state_id'
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
    modelName: 'City',
    tableName: 'city',
    createdAt:'created_at',
    updatedAt:'updated_at',
  });
  return City;
};