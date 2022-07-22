import { QueryTypes } from 'sequelize'
import { WinnerDto } from '../dtos'
import { HttpError } from '../middlewares'
import { Player, sequelize } from '../models'
import {
  WINNERS_QUERY,
  PRIZE_PER_GAME_QUERY,
  WinnersResult,
  PrizePerGameResult,
} from './winner.types'

export const calc = async (): Promise<WinnerDto> => {
  const [[winner], prizePerGame] = await Promise.all([
    sequelize.query<WinnersResult>(WINNERS_QUERY, { type: QueryTypes.SELECT }),
    sequelize.query<PrizePerGameResult>(PRIZE_PER_GAME_QUERY, {
      type: QueryTypes.SELECT,
    }),
  ])

  if (!winner) throw new HttpError(404, 'No winner in this game!')

  return new WinnerDto({
    player: await Player.findByPk(winner.player_id, {}),
    prize: prizePerGame.reduce((acc, item) => acc + item.prize, 0),
  })
}
