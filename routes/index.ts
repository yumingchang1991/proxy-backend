import express, { Router } from 'express'
import apicache from 'apicache'
import eodRouter from './modules/eod'

const router:Router = express.Router()

router.use('/eod/latest', apicache.middleware('60 minutes'), eodRouter)
router.use('/', (req, res, next) => {
  res.json('this is root path!')
})

export = router
