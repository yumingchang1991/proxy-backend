import { Schema, Model, Document, model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface iUserDocument extends Document {
  username: string,
  account: string,
  password: string,
  portfolios: Schema.Types.ObjectId[]
}

export interface iUser extends iUserDocument {
  comparePassword(password: string): boolean
}

export interface iUserModel extends Model<iUser> {
  hashPassword(password: string): string
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  portfolios: {
    type: [Schema.Types.ObjectId],
    ref: 'Portfolio'
  }
})

userSchema.method('comparePassword', function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
})

userSchema.static('hashPassword', (password: string) => {
  return bcrypt.hashSync(password)
})

export const User: iUserModel = model<iUser, iUserModel>('User', userSchema)
export default User
