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

    res.send({ data })
  })
)

/**
 * Gets an entity record
 */
deathRouter.get('/:id', async (req: Request, res: Response) => {
  const data = await deathService.getById(Number(req.params.id))

  res.send({ data })
})

/**
 * Creates an entity record
 */
deathRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { number, name } = req.body
    const data = await deathService.create({ number, name })

    res.send({ data })
  })
)

/**
 * Updates an entity record
 */
deathRouter.put('/', async (req: Request, res: Response) => {
  const { id, number, name } = req.body
  const data = await deathService.upsert({ id, number, name })

  res.send(data)
})
