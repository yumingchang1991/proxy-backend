import express, { Router } from 'express'

import eodRouter from './modules/eod'

const router:Router = express.Router()

router.use('/eod/latest', eodRouter)
router.use('/', (req, res, next) => {
  res.json('this is root path!')
})

export = router
