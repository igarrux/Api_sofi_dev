import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const guard = (req, res, next) => {
	try {
		const session = req?.signedCookies?.session
		const headerToken = req.headers?.['authorization']?.split(' ')[1]
		const authorization = session || headerToken
		if (!authorization) res.status(401).send()
		const auth = jwt.verify(authorization, process.env.JWT_SECRET)
		if (auth.id) {
			req.user_id = auth.id
			return next()
		} else res.status(401).send()
	} catch {
		res.status(401).send()
	}
}
