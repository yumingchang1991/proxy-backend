import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface iUserPayload {
  username: string,
  account: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log('this request is going through verifyJWT')
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.json({ status: 'error', message: 'no valid token'})
    console.log(authHeader) // Bearer token
    const token = authHeader.split(' ')[1]
    // this line returns payload object with signature if no error
    // if there is error, try/catch will catch them
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
    
    // if no error, then we cast decodedToken as our interface
    const decodedToken = jwt.decode(token) as iUserPayload
    const { username } = decodedToken

    req.user = username
    next()
  } catch (err) {
    if (err) return res.json({ status: 'error', message: 'token is extracted but considered manipulated' })
  }
}

export default verifyJWT
