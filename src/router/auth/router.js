import { Router } from 'express'
import { Login } from './login/login.js'
import { SingUp } from './signup/singup.js'
import { Logout } from './logout/logout.js'
const router = Router()

router.post('/login', Login)
router.post('/singup', SingUp)
router.post('/logout', Logout)
export { router as authRouter }