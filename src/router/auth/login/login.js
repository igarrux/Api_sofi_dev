import express from 'express'
import { getJWT, validateCredentials } from './utils/index.js'
import { cookieConfig } from './config.js'
const router = express.Router()

router.post('/login', async (req, res) => {
	const userId = await validateCredentials(req.body)
	if (!userId) return res.status(401).cookie('session', '').send()

	const jwt = getJWT(userId)
	res.cookie('session', jwt, cookieConfig)
	res.status(200).send()
})

export default router
