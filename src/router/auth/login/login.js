import { getJWT, validateCredentials } from './utils/index.js'
import { cookieConfig } from './config.js'

export const Login = async (req, res) => {
	if (!req.body) return res.status(400).send()
	const userId = await validateCredentials(req.body)
	if (!userId) return res.status(401).cookie('session', '').send()

	const jwt = getJWT(userId)
	res.cookie('session', jwt, cookieConfig)
	res.status(204).send()
}