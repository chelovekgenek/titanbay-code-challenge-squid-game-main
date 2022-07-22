import {
  DataTypes,
  Model,
  ModelAttributes,
  NOW,
  Sequelize,
  UUIDV4,
} from 'sequelize'

export interface BaseAttributes {
  id: number
  uid: string
  createdAt: Date
  updatedAt: Date
}

export class BaseModel extends Model implements BaseAttributes {
  public id: number
  public uid!: string
  public createdAt: Date
  public updatedAt: Date
}

export const baseModelAttributes: ModelAttributes<BaseModel, BaseAttributes> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: NOW,
    allowNull: false,
  },
}
