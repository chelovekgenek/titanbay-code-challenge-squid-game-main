import { Death } from '../models'
import { HttpError } from '../middlewares'
import { DeathSyncDto } from '../dtos'
import { MockbinFacade } from '../facades'
import logger from './logger'

const mockbinFacade = new MockbinFacade()

export const getAll = async (): Promise<Death[]> => {
  return Death.findAll({ where: {}, order: [['id', 'DESC']] })
}

export const getById = async (id: number): Promise<Death> => {
  if (Number.isInteger(id)) {
    const data = await Death.findByPk(id, {})
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

export const sync = async (): Promise<DeathSyncDto> => {
  try {
    let created = 0
    const data = await mockbinFacade.getDeaths()
    await Promise.all(
      data.map(async (item) => {
        try {
          await Death.create(
            {
              uid: item.uid,
              playerId: item.playerId,
              guardId: item.guardId,
              gameId: item.gameId,
              createdAt: new Date(item.createdAt),
              updatedAt: new Date(item.updatedAt),
            },
            {}
          )
          created++
        } catch (err) {}
      })
    )

    return new DeathSyncDto({ created })
  } catch (err) {
    logger(`Error. ${err}`, 'error')
    throw new HttpError(503, 'Service unavailable')
  }
}
