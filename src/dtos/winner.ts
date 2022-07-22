import { Game, Player } from '../models'

export class WinnerDto {
  player: Player
  prize: number

  constructor(params: WinnerDto) {
    this.player = params.player
    this.prize = params.prize
  }
}
