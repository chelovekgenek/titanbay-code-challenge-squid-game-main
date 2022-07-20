import { Router } from 'express'

import { gameRouter } from './game'
import { playerRouter } from './player'
import { guardRouter } from './guard'
import { deathRouter } from './death'

export const apiV1Router: Router = Router()

apiV1Router.use('/game', gameRouter)
apiV1Router.use('/player', playerRouter)
apiV1Router.use('/guard', guardRouter)
apiV1Router.use('/death', deathRouter)
