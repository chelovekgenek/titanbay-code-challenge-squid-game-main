import express, { Express, json } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { docsRouter } from './routes/docs'
import { apiV1Router } from './routes/api-v1'
import { errorHandler } from './middlewares'

const app: Express = express()

app.set('x-powered-by', false)
app.use(cors())
app.use(json())
app.use(morgan('dev'))

app.use('/docs', docsRouter)
app.use('/api/v1.0', apiV1Router)

app.use('/', (req, res) => {
  res.redirect('/docs')
})

app.use(errorHandler)

export { app }
