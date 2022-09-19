import { CookieOptions } from "express"

const authRefreshToken: CookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: true,
  sameSite: 'none'
}

const cookiesOption = {
  authRefreshToken
}

export default cookiesOption
