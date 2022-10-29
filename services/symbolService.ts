import { Response } from 'express'
import Symbol from "../models/symbol"
import errorHandler from "../middlewares/errorHandlers"

const symbolService = {
  async getSymbol (res: Response, input: string) {
    try {
      const symbol = await Symbol.findOne({ symbol: input })
      return symbol
    } catch (err) {
      errorHandler.general(res, `${input} is not a valid symbol in this application`)
    }
  }
}

export default symbolService
