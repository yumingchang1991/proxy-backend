import express, { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import rateLimitOptions from '../config/rateLimit'
import configCORS from '../config/cors'
import usersRoute from './api/users'
import authRoute from './api/auth'
import etfRoute from './api/etf'

const router: Router = express.Router()

const apiLimiter = rateLimit(rateLimitOptions)
router.use(apiLimiter)

configCORS(router)

router.use('/api/users', usersRoute)
router.use('/api/auth', authRoute)

router.use('/api', etfRoute)

export = router
