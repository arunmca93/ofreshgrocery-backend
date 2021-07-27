'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groceryCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.groceryItems, { foreignKey:'grocery_category_id', as:'grocery_items' });

    }
  };
  groceryCategory.init({
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
    modelName: 'groceryCategory',
    tableName: 'grocery_category',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return groceryCategory;
};