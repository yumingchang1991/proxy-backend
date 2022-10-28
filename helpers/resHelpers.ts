import { Response } from 'express'

const resHelpers = {
  setHeaders (res: Response) {
    res.header('Access-Control-Allow-Credentials', 'true')
    // res.header('Access-Control-Allow-Origin', 'https://yumingchang1991.github.io')
  },
  sendErrorJson (res: Response, errorMessage: String) {
    res.json({
      status: 'error',
      message: errorMessage
    })
  }
}

export default resHelpers
