import { Request, Response, NextFunction } from 'express'
import apiURL from '../config/marketstack'
import axios from 'axios'
import resHelpers from '../helpers/resHelpers'
import errorHandler from '../middlewares/errorHandlers'
import symbolService from '../services/symbolService'

const etfController = {
  getEOD (req: Request, res: Response, next: NextFunction) {
    const { etf } = req.params
    const symbolDocument = symbolService.getSymbol(res, etf)
    if (!symbolDocument) return errorHandler.general(res, `${etf} is not a valid symbol`)

    const url = apiURL.eod()
    url.searchParams.set('symbols', etf)
    axios
      .get(url.href)
      .then(marketstackResponse => {
        const { date, symbol, close, dividend } = marketstackResponse.data.data[0]
        const result = { date, symbol, close, dividend }
        resHelpers.setHeaders(res)
        return res.json(result)
      })
      .catch(err => {
        return errorHandler.general(res, err)
      })
  }
}

export default etfController