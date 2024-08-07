import { getJWT, validateCredentials } from './utils/index.js'
import { cookieConfig } from './cookie-config.js'
import { logger } from '../../../logger.js'

export const Login = async (req, res) => {
	try {
		if (!req.body) return res.status(400).send()
		const userId = await validateCredentials(req.body)
		if (!userId) return res.status(401).cookie('session', '').send()

		const jwt = getJWT(userId)
		res.cookie('session', jwt, cookieConfig)
		res.setHeader("token", jwt)
		res.status(204).send()
	} catch (error) {
		res.status(500).send()
		logger.Error(error)
	}
}
