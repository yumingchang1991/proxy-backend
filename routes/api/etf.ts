import { Router } from 'express'
import apicache from 'apicache'
import etfController from '../../controllers/etfController'
import verifyJWT from '../../middlewares/verifyJWT'

const router: Router = Router()

router.route('/:etf/eod')
  .get(verifyJWT, apicache.middleware('60 minutes'), etfController.getEOD)

export default router
