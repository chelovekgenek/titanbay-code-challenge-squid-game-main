import { Request, Response, NextFunction } from 'express'

export class HttpError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super(message)
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.code).send({ code: err.code, message: err.message })
  }

  return res.status(500).send({ code: 500, message: 'Internal server error' })
}
