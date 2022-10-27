import { Response } from 'express'
import resHelpers from "../helpers/resHelpers"

const errorHandler = {
  general (res: Response, err: unknown) {
    resHelpers.setHeaders(res)
    if (typeof err === 'string') {
      return resHelpers.sendErrorJson(res, err)
    }
    if (err instanceof Error) {
      return resHelpers.sendErrorJson(res, err.message)
    }
  }
}

export default errorHandler
