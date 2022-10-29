import { Response } from 'express'

const resHelpers = {
  setHeaders (res: Response) {
    res.header('Access-Control-Allow-Credentials', 'true')
  },
  sendErrorJson (res: Response, errorMessage: string) {
    res.json({
      status: 'error',
      message: errorMessage
    })
  }
}

export default resHelpers
