import { getAllPerGame } from './winner'
import { sequelize, Player, Game } from '../models'
import { createPlayer } from '../../test/factories/players'
import { createGame } from '../../test/factories/games'

jest.mock('../models', () => ({
  sequelize: {
    query: jest.fn(),
  },
  Player: {
    findOne: jest.fn(),
  },
  Game: {
    findOne: jest.fn(),
  },
}))

describe('Winner Service', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('getAllPerGame', () => {
    it('should return a list of WinnerDto', async () => {
      const player = { ...createPlayer(true), id: 1 } as Player
      const game1 = { ...createGame(true), id: 11 } as Game
      const game2 = { ...createGame(true), id: 12 } as Game
      const dto1 = {
        prize: 111,
        player,
        game: game1,
      }
      const dto2 = { prize: 112, player, game: game2 }
      const query = [
        { winner_id: player.id, game_id: game1.id, prize: dto1.prize },
        { winner_id: player.id, game_id: game2.id, prize: dto2.prize },
      ]

      jest.spyOn(sequelize, 'query').mockResolvedValue(query as any)
      jest.spyOn(Player, 'findOne').mockResolvedValue(player)
      jest
        .spyOn(Game, 'findOne')
        .mockResolvedValueOnce(game1)
        .mockResolvedValueOnce(game2)

      await expect(getAllPerGame()).resolves.toEqual([dto1, dto2])

      expect(sequelize.query).toHaveBeenCalledTimes(1)
      expect(Player.findOne).toHaveBeenCalledTimes(1)
      expect(Player.findOne).toHaveBeenCalledWith({
        where: { id: String(player.id) }, // Object.keys in original function returning array keys as string
      })
      expect(Game.findOne).toHaveBeenCalledTimes(2)
    })
  })
})
