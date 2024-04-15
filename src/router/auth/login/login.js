import express from 'express'
import { userIsValid } from './validations/user.js'
import { getJWT } from './get-jwt/get-jwt.js'
import { cookieConfig } from './config.js'
const router = express.Router()

router.get('/login', async (req, res) => {
	const userId = await userIsValid(req.body)
	if (!userId) return res.status(401).cookie('session', '').send()

	const jwt = getJWT(userId)
	res.cookie('session', jwt, cookieConfig)
	res.status(200).send()
})

export default router
