import { calc } from './winner'
import { sequelize, Player, Game } from '../models'
import { createPlayer } from '../../test/factories/players'
import { HttpError } from '../middlewares'

jest.mock('../models', () => ({
  sequelize: {
    query: jest.fn(),
  },
  Player: {
    findByPk: jest.fn(),
  },
}))

describe('Winner Service', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('calc', () => {
    it('should return a list of WinnerDto', async () => {
      const player = { ...createPlayer(true), id: 1 } as Player
      const qresult1 = [
        {
          player_id: player.id,
        },
      ]
      const qresult2 = [
        {
          prize: 111,
          game_id: 1,
        },
        { prize: 112, game_id: 2 },
      ]

      jest.spyOn(sequelize, 'query').mockResolvedValueOnce(qresult1 as any)
      jest.spyOn(sequelize, 'query').mockResolvedValueOnce(qresult2 as any)
      jest.spyOn(Player, 'findByPk').mockResolvedValue(player)

      await expect(calc()).resolves.toEqual({ player, prize: 223 })

      expect(sequelize.query).toHaveBeenCalledTimes(2)
      expect(Player.findByPk).toHaveBeenCalledTimes(1)
      expect(Player.findByPk).toHaveBeenCalledWith(qresult1[0].player_id, {})
    })

    it('should throw 404 if no winner found', async () => {
      const player = { ...createPlayer(true), id: 1 } as Player
      const qresult1 = []
      const qresult2 = [
        {
          prize: 111,
          game_id: 1,
        },
        { prize: 112, game_id: 2 },
      ]

      jest.spyOn(sequelize, 'query').mockResolvedValueOnce(qresult1 as any)
      jest.spyOn(sequelize, 'query').mockResolvedValueOnce(qresult2 as any)
      jest.spyOn(Player, 'findByPk').mockResolvedValue(player)

      await expect(calc()).rejects.toThrowError(
        new HttpError(404, 'No winner in this game!')
      )

      expect(sequelize.query).toHaveBeenCalledTimes(2)
      expect(Player.findByPk).toHaveBeenCalledTimes(0)
    })
  })
})
