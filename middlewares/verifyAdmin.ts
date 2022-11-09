import { Response, Request, NextFunction } from 'express'
import errorHandlers from '../middlewares/errorHandlers'

export function verifyAdmin (req: Request, res: Response, next: NextFunction) {
  try {
    req.isAdmin = req.user === 'admin'
      ? true
      : false
  } catch (err: unknown) {
    return errorHandlers.general(res, err)
  }
  next()
}

export default verifyAdmin
