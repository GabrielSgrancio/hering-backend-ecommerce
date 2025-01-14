import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class ProductModel
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false
  }
);

export default ProductModel;
