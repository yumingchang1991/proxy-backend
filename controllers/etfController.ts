import { Request, Response, NextFunction } from 'express'
import apiURL from '../config/marketstack'
import axios from 'axios'

const etfController = {
  getEOD (req: Request, res: Response, next: NextFunction) {
    const { etf } = req.params
    const url = apiURL.eod()
    url.searchParams.set('symbols', etf)
    axios
      .get(url.href)
      .then(marketstackResponse => {
        const { date, symbol, close, dividend } = marketstackResponse.data.data[0]
        const result = { date, symbol, close, dividend }
        res.header('Access-Control-Allow-Credentials', 'true')
        res.json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default etfController