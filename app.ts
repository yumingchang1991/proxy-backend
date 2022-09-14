if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import express from 'express'
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import router from './routes/index'
import './config/mongoose'

const app: express.Application = express()
const PORT: number = Number(process.env.PORT) || 8080

app.set('trust proxy', 2)

// set general middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(expressSession({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false
}))
// Marketstack API: https://marketstack.com/documentation


app.use(router)

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
