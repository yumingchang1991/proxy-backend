import { Response } from 'express'
import resHelpers from "../helpers/resHelpers"

const errorHandler = {
  general (res: Response, err: unknown, statusCode: number = 200) {
    resHelpers.setHeaders(res)
    if (typeof err === 'string') {
      return resHelpers.sendErrorJson(res, err, statusCode)
    }
    if (err instanceof Error) {
      return resHelpers.sendErrorJson(res, err.message, statusCode)
    }
  }
}

export default errorHandler
