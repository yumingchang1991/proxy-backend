import { Response, Request, NextFunction } from 'express'
import resHelpers from '../helpers/resHelpers'
import errorHandlers from '../middlewares/errorHandlers'

declare module "express-serve-static-core" {
  interface Request {
    isAdmin?: boolean;
  }
}

export function verifyAdmin (req: Request, res: Response, next: NextFunction) {
  try {
    req.isAdmin = req.user === 'admin'
      ? true
      : false
  } catch (err: unknown) {
    console.log('going through line 17 in verifyAdmin')
    return errorHandlers.general(res, err)
  }
  next()
}

export default verifyAdmin
