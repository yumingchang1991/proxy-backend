if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import express, { Router } from 'express'
import apicache from 'apicache'
import axios from 'axios'
import cors from 'cors'

const router: Router = express.Router()

const urlEodLatest = new URL(process.env.MARKETSTACK_BASE_URL || '')
urlEodLatest.pathname = 'v1/eod/latest'
urlEodLatest.searchParams.set('access_key', process.env.MARKETSTACK_API_KEY || '')

router.route('/:etf/eod').options(cors({ origin: process.env.CLIENT_ORIGIN }))
router.route('/:etf/eod').get(apicache.middleware('60 minutes'), (req, res, next) => {
  const { etf } = req.params
  urlEodLatest.searchParams.set('symbols', etf)
  axios
    .get(urlEodLatest.href)
    .then(marketstackResponse => {
      const { date, symbol, close, dividend } = marketstackResponse.data.data[0]
      const result = { date, symbol, close, dividend }
      res.json(result)
    })
    .catch(err => {
      console.log(err)
    })
})

export = router
