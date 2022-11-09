import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import errorHandler from '../middlewares/errorHandlers'
import resHelper from '../helpers/resHelpers'
import { iUserPayload } from 'verifyJWT'

declare module "express-serve-static-core" {
  interface Request {
    isAdmin?: boolean,
    user?: string
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    resHelper.setHeaders(res)
    return resHelper.sendErrorJson(res, 'there is no access token', 401)
  }
  
  let token
  try {
    token = authHeader.split(' ')[1]
    // this line returns payload object with signature if no error
    // if there is error, try/catch will catch them
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
  } catch (err: unknown) {
    return errorHandler.general(res, 'Something wrong, please try to log in again.', 401)
  }
  // if no error, then we cast decodedToken as our interface
  const decodedToken = jwt.decode(token) as iUserPayload
  const { username } = decodedToken
  req.user = username
  next()
}

export default verifyJWT
