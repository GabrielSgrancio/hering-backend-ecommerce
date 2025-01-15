import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
  color?: string;
  size?: string;
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
  public color?: string;
  public size?: string;
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
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false
  }
);

export default ProductModel;
