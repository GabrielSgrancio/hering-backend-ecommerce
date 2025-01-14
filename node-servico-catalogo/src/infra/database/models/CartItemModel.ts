import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';
import UserModel from './UserModel';
import ProductModel from './ProductModel';

interface CartItemAttributes {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

class CartItemModel
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
}

CartItemModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize,
    tableName: 'cart_items',
    timestamps: false
  }
);

// (User -> CartItem -> Product)
UserModel.hasMany(CartItemModel, { foreignKey: 'userId' });
CartItemModel.belongsTo(UserModel, { foreignKey: 'userId' });

ProductModel.hasMany(CartItemModel, { foreignKey: 'productId' });
CartItemModel.belongsTo(ProductModel, { foreignKey: 'productId' });

export default CartItemModel;
