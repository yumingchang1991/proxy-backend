import { Response } from 'express'
import Symbol from "../models/symbol"
import errorHandler from "../middlewares/errorHandlers"

const symbolService = {
  async getSymbol (res: Response, input: String) {
    try {
      const symbol = await Symbol.findOne({ symbol: input })
      return symbol
    } catch (err) {
      errorHandler.general(res, err)
    }
  }
}

export default symbolService
