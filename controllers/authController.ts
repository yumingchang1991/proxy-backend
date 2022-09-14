import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import jwtOptions from '../config/jwt'
import cookieOptions from '../config/cookies'

interface iUserPayload {
  username: string,
  account: string
}

const authController = {
  handleLogIn(req: Request, res: Response, next: NextFunction) {
    const { account, password } = req.body
    if (!account && !password) {
      res.header('Access-Control-Allow-Credentials', 'true')
      return res.json({
        status: 'error',
        message: 'missing account and password'
      })
    }
    if (!account) {
      res.header('Access-Control-Allow-Credentials', 'true')
      return res.json({
        status: 'error',
        message: 'missing account'
      })
    }
    if (!password) {
      res.header('Access-Control-Allow-Credentials', 'true')
      return res.json({
        status: 'error',
        message: 'missing password'
      })
    }
    User
      .findOne({ account })
      .then(user => {
        if (!user) {
          res.header('Access-Control-Allow-Credentials', 'true')
          return res.json({
            status: 'error',
            message: `account is not valid`
          })
        }
        if (!user.comparePassword(password)) {
          res.header('Access-Control-Allow-Credentials', 'true')
          return res.json({
            status: 'error',
            message: `password is not valid`
          })
        }
        const userPayload = {
          username: user.username,
          account: user.account
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
        res.header('Access-Control-Allow-Credentials', 'true')
        res.cookie('jwt', refreshToken, cookieOptions.authRefreshToken)
        res.json({
          status: 'success',
          username: user.username,
          accessToken })
      })
      .catch(e => {
        next(e)
      })

  },
  handleRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies
      if (!cookies?.jwt) return res.json({ status: 'error', message: 'no access token' })
      const refreshToken = cookies.jwt
      jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET as string)
      const decodedToken = jwt.decode(refreshToken) as iUserPayload
      User
        .findOne({ account: decodedToken.account })
        .then(foundUser => {
          if (!foundUser || foundUser.username !== decodedToken.username) {
            res.header('Access-Control-Allow-Credentials', 'true')
            return res.json({ status: 'error', message: 'account is not valid in db' })
          }
          const accessToken = jwt.sign(
            decodedToken,
            process.env.ACCESS_TOKEN_SECRET as string,
            jwtOptions.accessTokenOptions
          )
          res.header('Access-Control-Allow-Credentials', 'true')
          res.json({
            status: 'success',
            accessToken
          })
        })
        .catch(err => {
          res.header('Access-Control-Allow-Credentials', 'true')
          res.json({
            status: 'error',
            message: err
          })
        })
    } catch (err) {
      res.header('Access-Control-Allow-Credentials', 'true')
      return res.json({ status: 'error', message: 'access token is not valid' })
    }
  },
  handleLogout(req: Request, res: Response, next: NextFunction) {
    // on client also delete accessToken
    try {
      const cookies = req.cookies
      if (!cookies?.jwt) {
        res.header('Access-Control-Allow-Credentials', 'true')
        return res.json({ status: 'success', message: 'no content to clear!' })
      }
      const refreshToken = cookies.jwt
      res.clearCookie('jwt', cookieOptions.authRefreshToken)
      res.header('Access-Control-Allow-Credentials', 'true')
      res.json({ status: 'success' })
    } catch (err) {
      res.header('Access-Control-Allow-Credentials', 'true')
      return res.json({ status: 'error', message: 'access token is not valid' })
    }
  }
}

export default authController
