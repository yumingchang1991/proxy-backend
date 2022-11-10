import Symbol from "../models/symbol"

const symbolService = {
  async getSymbol (input: string) {
    try {
      const symbol = await Symbol.findOne({ symbol: input })
      return symbol
    } catch (err) {
      throw Error(`${input} is not a valid symbol in this application`)
    }
  }
}

export default symbolService
