import { Request, Response } from 'express'
import apiURL from '../config/marketstack'
import axios from 'axios'
import resHelpers from '../helpers/resHelpers'
import errorHandler from '../middlewares/errorHandlers'
import symbolService from '../services/symbolService'

const etfController = {
  async getEOD (req: Request, res: Response) {
    const { etf } = req.params
    let symbolDocument
    try {
      symbolDocument = await symbolService.getSymbol(etf)
    } catch (err: unknown) {
      return errorHandler.general(res, err)
    }
    
    if (!symbolDocument) return errorHandler.general(res, `${etf} is not accepted in this application`)

    const url = apiURL.eod()
    url.searchParams.set('symbols', etf)

    let marketstackResponse
    try {
      marketstackResponse = await axios.get(url.href)
    } catch (err) {
      return errorHandler.general(res, err)
    }
    
    if (!marketstackResponse) return errorHandler.general(res, `no error in axios but marketstack respond with empty result`)

    const { date, symbol, close, dividend } = marketstackResponse.data.data[0]
    const result = { date, symbol, close, dividend }
    resHelpers.setHeaders(res)
    return res.json(result)
  }
}

export default etfController