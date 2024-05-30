import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const getJWT = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET)
}
