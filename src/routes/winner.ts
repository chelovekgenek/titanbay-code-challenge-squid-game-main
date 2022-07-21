import { Router, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { winner as winnerService } from '../services'

export const winnerRouter: Router = Router()

/**
 * Gets all entity records
 */
winnerRouter.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const data = await winnerService.getAllPerGame()

    res.send(data)
  })
)
