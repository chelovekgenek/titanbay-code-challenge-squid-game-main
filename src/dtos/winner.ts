import { Game, Player } from '../models'

export class WinnerDto {
  game: Game
  player: Player
  prize: number

  constructor(params: WinnerDto) {
    this.game = params.game
    this.player = params.player
    this.prize = params.prize
  }
}
