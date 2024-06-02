import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const guard = (req, res, next) => {
	try {
		const session = req?.cookies?.session
		if (!session) res.status(401).send()
		const auth = jwt.verify(session, process.env.JWT_SECRET)
		if (auth.id) {
			req.user_id = auth.id
			return next()
		} else res.status(401).send()
	} catch {
		res.status(401).send()
	}
}
