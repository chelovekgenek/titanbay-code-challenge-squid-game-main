import { DataTypes, ModelAttributes } from 'sequelize'

import { BaseAttributes, BaseModel, baseModelAttributes } from './base'

export interface PlayerAttributes extends BaseAttributes {
  number: string // 3-digit string, e.g. - 001;
  name: string
  debt: number
  dob: string
  address: string
  city: string
  phone: string
}

export class Player extends BaseModel implements PlayerAttributes {
  public number: string
  public name: string
  public debt: number
  public dob: string
  public address: string
  public city: string
  public phone: string
}

export const playerModelAttributes: ModelAttributes<Player, PlayerAttributes> =
  {
    ...baseModelAttributes,
    number: {
      type: DataTypes.CHAR(3),
    },
    name: {
      type: DataTypes.TEXT,
    },
    debt: {
      type: DataTypes.INTEGER,
    },
    dob: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
  }
