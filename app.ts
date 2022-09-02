if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import router from './routes/index'

const app: express.Application = express()
const PORT: number = Number(process.env.PORT) || 8080

app.set('trust proxy', 2)

app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.urlencoded({ extended: true }))
// Marketstack API: https://marketstack.com/documentation
// End-of-day Data & Historical Data

const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 30
})

app.use('/api', apiLimiter, router)

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
