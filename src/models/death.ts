import { ModelAttributes } from 'sequelize'

import { BaseAttributes, BaseModel, baseModelAttributes } from './base'

export interface DeathAttributes extends BaseAttributes {}

export class Death extends BaseModel implements DeathAttributes {}

export const deathModelAttributes: ModelAttributes<Death, DeathAttributes> = {
  ...baseModelAttributes,
}
