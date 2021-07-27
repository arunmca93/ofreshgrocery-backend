'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN, INET
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{ foreignKey:'city_id', as:'city' })
      this.belongsTo(models.Users,{ foreignKey:'user_id', as:'users' })

      this.hasMany(models.groceryShops, { foreignKey:'address_id', as:'grocery_shops' } )
      this.hasMany(models.groceryOrders, { foreignKey:'address_id', as:'grocery_orders' } )

      
      //this.hasMany(models.groceryItems , { foreignKey:'unit_id', as:'grocery_items' });

    }
  };
  Address.init({
    id:{
      type: INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true      
    },
    lineOne:{
      type: STRING,
      allowNull:false,
      field:'line_one'
    },
    lineTwo:{
      type: STRING,
      field:'line_two'
    },
    lineThree:{
        type: STRING,
        field:'line_three'
    },
    cityId:{
        type: INTEGER,
        allowNull:false,
        field:'city_id' 
    },
    postalCode:{
      type: INTEGER,
      allowNull:false,
      field:'postal_code' 
    },
    userId:{
        type: INTEGER,
        allowNull:false,
        field:'user_id' 
    },
    tagName:{
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
    modelName: 'Address',
    tableName: 'address',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return Address;
};