'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groceryItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.groceryCategory, { foreignKey:'grocery_category_id', as:'grocery_category' });
      this.belongsTo(models.Unit, { foreignKey:'unit_id', as:'unit' });
      this.hasMany(models.Tags, { foreignKey:'grocery_item_id', as:'tags' })
    }
  };
  groceryItems.init({
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
    groceryCategoryId:{
        type: INTEGER,
        allowNull: false,
        field:'grocery_category_id'
    },
    unitId:{
        type: INTEGER,
        allowNull: false,
        field:'unit_id'
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
    modelName: 'groceryItems',
    tableName: 'grocery_items',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return groceryItems;
};