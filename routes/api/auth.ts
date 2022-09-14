import { Router } from 'express'
import authController from '../../controllers/authController'

const router: Router = Router()

router.route('/login')
  .post(authController.handleLogIn)

router.route('/refresh')
  .get(authController.handleRefreshToken)

router.route('/logout')
  .get(authController.handleLogout)

export default router
