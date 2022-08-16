if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import express from 'express'
import axios from 'axios'
import cors from 'cors'
import router from './routes/index'

const app: express.Application = express()

const PORT: number = Number(process.env.PORT) || 8080
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.urlencoded({ extended: true }))
// Marketstack API: https://marketstack.com/documentation
// End-of-day Data & Historical Data

app.use(router)

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
