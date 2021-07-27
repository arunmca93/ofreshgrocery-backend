'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN, INET
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groceryShops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Address,{ foreignKey:'address_id', as:'address' })
      this.belongsTo(models.Users,{ foreignKey:'user_id', as:'users' })

      this.hasMany(models.groceryOrders, { foreignKey:'shop_id', as:'grocery_orders' } )


      //this.hasMany(models.groceryItems , { foreignKey:'unit_id', as:'grocery_items' });

    }
  };
  groceryShops.init({
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
    mobile:{
      type: STRING,
      allowNull:false
    },
    email:{
        type: STRING,
        allowNull:false
    },
    userId:{
        type: INTEGER,
        allowNull:false,
        field:'user_id' 
    },
    addressId:{
        type: INTEGER,
        allowNull:false,
        field:'address_id' 
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
    modelName: 'groceryShops',
    tableName: 'grocery_shops',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return groceryShops;
};