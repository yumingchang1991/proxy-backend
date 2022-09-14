import express from 'express'
import cors from 'cors'

const origin = process.env.NODE_ENV === 'production'
  ? ['https://yumingchang1991.github.io']
  : ['https://yumingchang1991.github.io', 'http://localhost:3000']

const corsOptions = {
  general: {
    origin
  },
  withCredentials: {
    origin,
    credentials: true
  }
}

const configCORS = (router: express.Router) => {
  router.route('/api/users').options(cors(corsOptions.withCredentials))
  router.route('/api/auth/login').options(cors(corsOptions.withCredentials))
  router.route('/api/auth/logout').options(cors(corsOptions.withCredentials))
  router.route('/api/:etf/eod').options(cors(corsOptions.withCredentials))
  router.use(cors(corsOptions.general))
}

export default configCORS
