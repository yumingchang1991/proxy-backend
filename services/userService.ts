import { Schema } from 'mongoose'
import User, { iUserModel } from '../models/user'

const userService = {
  async findUser (account: string) {
    const user = await User.findOne({ account })
    return user
  }
}

export default userService
