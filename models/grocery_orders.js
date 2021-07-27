'use strict';
const {
  Model, STRING, INTEGER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groceryOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.groceryItems , { foreignKey:'unit_id', as:'grocery_items' });

      this.belongsTo(models.Address,{ foreignKey:'address_id', as:'address' })
      this.belongsTo(models.Users,{ foreignKey:'user_id', as:'users' })
      this.belongsTo(models.groceryShops,{ foreignKey:'shop_id', as:'grocery_shops' })

    }
  };
  groceryOrders.init({
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
    description:{
        type: STRING,
    },
    userId:{
        type: INTEGER,
        allowNull:false,
        field:'user_id' 
    },
    shopId:{
        type: INTEGER,
        allowNull:false,
        field:'shop_id' 
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
    modelName: 'groceryOrders',
    tableName: 'grocery_orders',
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return groceryOrders;
};