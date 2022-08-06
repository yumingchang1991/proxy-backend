if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import express from 'express'
import axios from 'axios'

const app: express.Application = express()

const PORT: number = Number(process.env.PORT) || 3000
const BASE_URL: string = 'http://api.marketstack.com/v1/'

// Marketstack API: https://marketstack.com/documentation
// End-of-day Data & Historical Data

// /api/:symbol/
app.get('/', (req, res) => {
  res.json('it is working!')
})

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
