import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()

const jwtOptions = {
  accessTokenOptions: {
    expiresIn: process.env.NODE_ENV === 'production' ? 5 * 60 : 30
    // 5 mins in production, or 30 seconds for the rest
  },
  refreshTokenOptions: {
    expiresIn: 24 * 60 * 60
    // 1 day
  }
}

export default jwtOptions
