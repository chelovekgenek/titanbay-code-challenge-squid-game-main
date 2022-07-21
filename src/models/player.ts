import { DataTypes, ModelAttributes } from 'sequelize'

import { BaseAttributes, BaseModel, baseModelAttributes } from './base'

export interface PlayerAttributes extends BaseAttributes {
  number: string // 001
  name: string
}

export class Player extends BaseModel implements PlayerAttributes {
  public number: string
  public name: string
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
  }
