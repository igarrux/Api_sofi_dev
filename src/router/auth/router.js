import { Router } from 'express'
import { Login } from './login/login.js'
const router = Router()

router.post('/login', Login)

export { router as authRouter }
