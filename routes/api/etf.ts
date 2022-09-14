import { Router } from 'express'
import apicache from 'apicache'
import etfController from '../../controllers/etfController'

const router: Router = Router()

router.route('/:etf/eod')
  .get(apicache.middleware('60 minutes'), etfController.getEOD)

export default router
