import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';

interface PromotionAttributes {
  id: number;
  name: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface PromotionCreationAttributes
  extends Optional<PromotionAttributes, 'id' | 'created_at' | 'updated_at'> {}

class PromotionModel
  extends Model<PromotionAttributes, PromotionCreationAttributes>
  implements PromotionAttributes
{
  public id!: number;
  public name!: string;
  public discount_percent!: number;
  public start_date!: Date;
  public end_date!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

PromotionModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'promotions',
    sequelize,
    timestamps: false 
  }
);

export default PromotionModel;
