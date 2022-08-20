if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import axios from 'axios'
import express, { Router } from 'express'
import cors from 'cors'
const eodRouter: Router = express.Router()

const urlEodLatest = new URL(process.env.MARKETSTACK_BASE_URL || '')
urlEodLatest.pathname = 'v1/eod/latest'
urlEodLatest.searchParams.set('access_key', process.env.MARKETSTACK_API_KEY || '')

eodRouter.route('/').options(cors())
eodRouter.route('/').post((req, res, next) => {
  const { symbol } = req.body
  urlEodLatest.searchParams.set('symbol', symbol || 'VTI')
  axios
    .get(urlEodLatest.href)
    .then(marketstackResponse => {
      const { data } = marketstackResponse
      res.json(data)
    })
})

export = eodRouter
