import User from '../models/user'
import bcrypt from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import resHelpers from '../helpers/resHelpers'

const userController = {
  async postUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { username, account, password } = req.body
      if (username && account && password) {
        const user = await User.findOne({ account })
        if (user) {
          return resHelpers.sendErrorJson(res, `${account} already exists ... pick another account`)
        }
        const HASH = bcrypt.genSaltSync(10)
        const newUser = await User.create({
            username,
            account,
            password: bcrypt.hashSync(password, HASH)
          }).catch(next)
        if (newUser) {
          return res.json({
            status: 'success',
            data: newUser.toJSON()
          })
        }
        return resHelpers.sendErrorJson(res, 'something wrong, new User is not created')
      }
    } catch (e) {
      if (e instanceof Error) {
        return resHelpers.sendErrorJson(res, e.message)
      }
    }
  }
}

export default userController
