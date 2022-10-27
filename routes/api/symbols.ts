import { Router } from 'express'
import multer from 'multer'
import symbolsController from '../../controllers/symbolsController'
import verifyJWT from '../../middlewares/verifyJWT'
import verifyAdmin from '../../middlewares/verifyAdmin'

const router: Router = Router()

router.route('/')
  .post(
    verifyJWT,
    verifyAdmin,
    multer().single('file'),
    symbolsController.handlePost
  )

export default router