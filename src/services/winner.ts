import { QueryTypes } from 'sequelize'
import { WinnerDto } from '../dtos'
import { Game, Player, sequelize } from '../models'
import { WinnerPerGameResult, WINNER_PER_GAME_QUERY } from './winner.types'

export const getAllPerGame = async (): Promise<WinnerDto[]> => {
  const result = await sequelize.query<WinnerPerGameResult>(
    WINNER_PER_GAME_QUERY,
    { type: QueryTypes.SELECT }
  )

  const distinctPlayers = result.reduce<Record<number, undefined | Player>>(
    (acc, item) => ({ ...acc, [item.winner_id]: undefined }),
    {}
  )
  await Promise.all(
    Object.keys(distinctPlayers).map(async (id) => {
      distinctPlayers[id] = await Player.findOne({ where: { id } })
      return id
    })
  )

  return Promise.all(
    result.map(
      async (item) =>
        new WinnerDto({
          game: await Game.findOne({ where: { id: item.game_id } }),
          player: distinctPlayers[item.winner_id],
          prize: item.prize,
        })
    )
  )
}
