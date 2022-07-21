import { Router, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { death as deathService } from '../services'

export const deathRouter: Router = Router()

/**
 * Gets all entity records
 */
deathRouter.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const data = await deathService.getAll()

    res.send(data)
  })
)

/**
 * Sync entity records with 3rd party data feed
 */
deathRouter.put(
  '/sync',
  asyncHandler(async (req: Request, res: Response) => {
    const data = await deathService.sync()

    res.send(data)
  })
)

/**
 * Gets an entity record
 */
deathRouter.get('/:id', async (req: Request, res: Response) => {
  const data = await deathService.getById(Number(req.params.id))

  res.send(data)
})
