import { getAll, getById, mockbinFacade, sync } from './death'
import { Death } from '../models'
import { createDeath } from '../../test/factories/deaths'
import { HttpError } from '../middlewares'

jest.mock('../models', () => ({
  Death: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}))

describe('Death Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should return a list of Death', async () => {
      const death = { ...createDeath(true), id: 1 } as Death

      jest.spyOn(Death, 'findAll').mockResolvedValue([death])

      await expect(getAll()).resolves.toEqual([death])

      expect(Death.findAll).toHaveBeenCalledTimes(1)
      expect(Death.findAll).toHaveBeenCalledWith({
        where: {},
        order: [['id', 'DESC']],
      })
    })
  })

  describe('getById', () => {
    it('should return a record of Death', async () => {
      const death = { ...createDeath(true), id: 1 } as Death

      jest.spyOn(Death, 'findByPk').mockResolvedValue(death)

      await expect(getById(death.id)).resolves.toEqual(death)

      expect(Death.findByPk).toHaveBeenCalledTimes(1)
      expect(Death.findByPk).toHaveBeenCalledWith(death.id, {})
    })

    it('should throw 404 error when a Death record not found', async () => {
      const death = { ...createDeath(true), id: 1 } as Death

      jest.spyOn(Death, 'findByPk').mockResolvedValue(undefined)

      await expect(getById(death.id)).rejects.toThrowError(
        new HttpError(404, 'Unknown data')
      )

      expect(Death.findByPk).toHaveBeenCalledTimes(1)
      expect(Death.findByPk).toHaveBeenCalledWith(death.id, {})
    })

    it('should throw 400 error when a passed value is not integer', async () => {
      jest.spyOn(Death, 'findByPk').mockResolvedValue(undefined)

      await expect(getById(NaN)).rejects.toThrowError(
        new HttpError(400, 'Expected ID')
      )

      expect(Death.findByPk).toHaveBeenCalledTimes(0)
    })
  })

  describe('sync', () => {
    it('should return a DeathSyncDto', async () => {
      const deathEntity = { ...createDeath(true), id: 1 } as Death
      const death = {
        uid: deathEntity.uid,
        playerId: 1,
        guardId: 2,
        gameId: 3,
        createdAt: deathEntity.createdAt.toISOString(),
        updatedAt: deathEntity.updatedAt.toISOString(),
      }
      jest.spyOn(mockbinFacade, 'getDeaths').mockResolvedValue([death])
      jest.spyOn(Death, 'create').mockResolvedValue([deathEntity])

      await expect(sync()).resolves.toEqual({ created: 1 })

      expect(mockbinFacade.getDeaths).toBeCalledTimes(1)
      expect(Death.create).toBeCalledTimes(1)
      expect(Death.create).toBeCalledWith(
        {
          ...death,
          createdAt: new Date(death.createdAt),
          updatedAt: new Date(death.updatedAt),
        },
        {}
      )
    })

    it('should throw 503 if any error in facade occured', async () => {
      jest
        .spyOn(mockbinFacade, 'getDeaths')
        .mockRejectedValue(new Error('ERR_CONNTIMEOUT'))

      await expect(sync()).rejects.toThrowError(
        new HttpError(503, 'Service unavailable')
      )

      expect(mockbinFacade.getDeaths).toBeCalledTimes(1)
      expect(Death.create).toBeCalledTimes(0)
    })
  })
})
