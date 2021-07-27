'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.groceryItems, { foreignKey:'grocery_item_id', as:'grocery_items' });
      this.belongsTo(models.Language, { foreignKey:'language_id', as:'language' });
      this.belongsTo(models.groceryOrdersLine, { foreignKey:'tag_id', as:'grocery_orders_line'})
    }
  };
  Tags.init({
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
    groceryItemId:{
        type: INTEGER,
        allowNull: false,
        field:'grocery_item_id'
    },
    languageId:{
        type: INTEGER,
        allowNull: false,
        field:'language_id'
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
    modelName: 'Tags',
    tableName: 'tags',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return Tags;
};