import logger from './logger'
import { Player } from '../models'
import { HttpError } from '../middlewares'

export const getAll = async (): Promise<Player[]> => {
  return Player.findAll({ where: {}, order: [['id', 'DESC']] })
}

export const getById = async (id: number): Promise<Player> => {
  if (Number.isInteger(id)) {
    const data = await Player.findByPk(id, {})
    if (data) {
      return data
    } else {
      logger('Error. Unknown data', 'error')
      throw new HttpError(404, 'Unknown data')
    }
  } else {
    logger('Error. Expected ID', 'error')
    throw new HttpError(400, 'Expected ID')
  }
}

export const create = async (
  params: Pick<Player, 'number' | 'name'>
): Promise<Player> => {
  try {
    const data = await Player.create(params, {})
    return data
  } catch (err) {
    logger(`Error. ${err}`, 'error')
    throw new HttpError(400, err.message)
  }
}

export const upsert = async (
  params: Pick<Player, 'id' | 'number' | 'name'>
): Promise<Player> => {
  try {
    const [data] = await Player.upsert(params)
    return data
  } catch (err) {
    logger(`Error. ${err}`, 'error')
    const { message } = err
    throw new HttpError(400, message)
  }
}
