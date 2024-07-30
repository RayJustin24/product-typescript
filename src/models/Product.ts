import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
  id: string;
  productname: string;
  barcode: string;
  description?: string;
  expiry_date?: Date;
  purchase_date: Date;
  vatable: boolean;
  category: string;
  price: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public productname!: string;
  public barcode!: string;
  public description?: string;
  public expiry_date?: Date;
  public purchase_date!: Date;
  public vatable!: boolean;
  public category!: string;
  public price!: number;
}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  vatable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
});

export default Product;
