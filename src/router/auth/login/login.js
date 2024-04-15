import express from 'express'
import { userIsValid } from './validations/user.js'
import { getJWT } from './get-jwt/get-jwt.js'
const router = express.Router()

const isCookieSecure = process.env.IS_COOKIE_SECURE == 'true'
const cookieConfig = {
	httpOnly: true,
	secure: isCookieSecure,
	sameSite: 'none',
}

router.get('/login', async (req, res) => {
	const userId = await userIsValid(req.body)
	if (!userId) return res.status(401).send()
	const jwt = getJWT(userId)
	res.cookie('session', jwt, cookieConfig)
	res.status(200).send()
})

export default router
