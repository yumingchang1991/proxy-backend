import { Request, Response } from 'express'
import { Readable } from 'stream'
import Symbol from '../models/symbol'
import resHelpers from '../helpers/resHelpers'
import errorHandler from '../middlewares/errorHandlers'

declare module "express-serve-static-core" {
  interface Request {
    isAdmin?: boolean;
  }
}

const symbolsController = {
  handlePost (req: Request, res: Response) {
    const { isAdmin, file } = req

    try {
      if (!isAdmin) throw Error('only admin could modify symbols')
      if (!file) throw Error('please upload a file')
    } catch (err: unknown) {
      console.log('going through line 21 in SymbolsController')
      return errorHandler.general(res, err)
    }

    if (file) {
      const readable = Readable.from(file.buffer, {
        encoding: 'utf8',
        objectMode: false
      })
      
      const result: Array<any> = []
      let unprocessed: String = ''

      readable.on('readable', () => {
        const chunk = unprocessed + readable.read()
        unprocessed = ''

        let startingIndex = 0
        for (let i = 0; i < chunk.length; i++) {
          if (chunk[i] === '\n') {
            const [symbol, name, fees] = getValidString(
              chunk.slice(startingIndex, i + 1)
              ).split(',')
            startingIndex = i + 1
            if (symbol === 'Symbol') continue
            if (isNaN(parseFloat(fees.replace('%', '').trim()))) console.log(symbol, name, fees)
            result.push({ symbol, name, fees: parseFloat(fees.replace('%', '').trim()) })
          }
          if (result.length >= 300) {
            Symbol
              .create(result)
              .catch(err => errorHandler.general(res, err))
            result.length = 0
          }
        }

        if (chunk[chunk.length - 1] !== '\n') {
          unprocessed = chunk.slice(startingIndex)
        }
      })

      readable.on('close', () => {
        if (result.length > 0) {
          Symbol
            .create(result)
            .then(() => {
              result.length = 0
              resHelpers.setHeaders(res)
              return res.json({ status: 'success', message: 'symbols are updated' })
            })
            .catch(err => errorHandler.general(res, err))
        }
      })
    }
  }
}

function getValidString (s: String): String {
  return s.replace('\r', '')
    .replace('\n', '')
    .replace(/"*/g, '')
}

export default symbolsController
