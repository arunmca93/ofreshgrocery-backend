'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN, FLOAT
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groceryOrdersLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Tags , { foreignKey:'tag_id', as:'tags' });

    }
  };
  groceryOrdersLine.init({
    id:{
      type: INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true      
    },
    orderId:{
      type: INTEGER,
      allowNull:false,
      field:'order_id'
    },
    tagId:{
      type: INTEGER,
      allowNull:false,
      field:'tag_id'
    },
    quantity:{
      type: FLOAT,
      allowNull:false 
    },
    description:{
        type: STRING
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
    modelName: 'groceryOrdersLine',
    tableName: 'grocery_orders_line',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return groceryOrdersLine;
};