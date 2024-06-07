import { Router } from 'express'
import { Login } from './login/login.js'
import { SingUp } from './signup/singup.js'
import { Logout } from './logout/logout.js'
import { GetUserInfo } from './user/get_user_info.js'
import { guard } from '../../guard.js'
const router = Router()

router.post('/login', Login)
router.post('/singup', SingUp)
router.post('/logout', Logout)
router.get('/user-info', guard, GetUserInfo)
export { router as authRouter }
