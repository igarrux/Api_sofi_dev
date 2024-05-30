import { Router } from 'express'
import { Login } from './login/login.js'
import { SingUp } from './signup/singup.js'
const router = Router()

router.post('/login', Login)
router.post('/singup', SingUp)
export { router as authRouter }
