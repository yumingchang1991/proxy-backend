import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import jwtOptions from '../config/jwt'
import cookieOptions from '../config/cookies'
import resHelpers from '../helpers/resHelpers'
import errorHandler from '../middlewares/errorHandlers'
import { iUserPayload } from 'verifyJWT'

const authController = {
  handleLogIn(req: Request, res: Response, next: NextFunction) {
    const { account, password } = req.body

    try {
      if (!account && !password) throw Error('missing account and password')
      if (!account) throw Error('missing account')
      if (!password) throw Error('missing password')
    } catch (err: unknown) {
      return errorHandler.general(res, err)
    }
    

    User
      .findOne({ account })
      .then(user => {
        
        try {
          if (!user) throw Error('account is not valid')
          if (!user.comparePassword(password)) throw Error('password is not valid')
        } catch (err: unknown) {
          return errorHandler.general(res, err)
        }

        const userPayload = {
          username: user?.username,
          account: user?.account
        }
        const accessToken = jwt.sign(
          userPayload,
          process.env.ACCESS_TOKEN_SECRET as string,
          jwtOptions.accessTokenOptions
        )
        const refreshToken = jwt.sign(
          userPayload,
          process.env.REFRESH_TOKEN_SECRET as string,
          jwtOptions.refreshTokenOptions
        )
        resHelpers.setHeaders(res)
        res.cookie('jwt', refreshToken, cookieOptions.authRefreshToken)
        return res.json({
          status: 'success',
          username: user?.username,
          accessToken })
      })
      .catch(err => {
        return errorHandler.general(res, err)
      })

  },
  async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies
      if (!cookies?.jwt) throw Error('no access token')

      const refreshToken = cookies.jwt
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)

      const decodedToken = jwt.decode(refreshToken) as iUserPayload

      const foundUser = await User.findOne({ account: decodedToken.account })
      if (!foundUser || foundUser.username !== decodedToken.username) {
        throw Error('account is not valid in db')
      }

      const payload = {
        username: decodedToken.username,
        account: decodedToken.account
      }
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        jwtOptions.accessTokenOptions
      )
      resHelpers.setHeaders(res)
      res.json({
        status: 'success',
        accessToken
      })
    } catch (err) {
      return errorHandler.general(res, err)
    }
  },
  handleLogout(req: Request, res: Response, next: NextFunction) {
    // on client also delete accessToken
    try {
      const cookies = req.cookies
      if (!cookies?.jwt) {
        resHelpers.setHeaders(res)
        return res.json({ status: 'success', message: 'no content to clear!' })
      }
      const refreshToken = cookies.jwt
      res.clearCookie('jwt', cookieOptions.authRefreshToken)
      resHelpers.setHeaders(res)
      return res.json({ status: 'success' })
    } catch (err) {
      return errorHandler.general(res, err)
    }
  }
}

export default authController
