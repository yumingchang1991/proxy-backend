import { Router } from 'express'
import userController from '../../controllers/userController'

const router:Router = Router()

router.route('/')
  .post(userController.postUser)

export default router
