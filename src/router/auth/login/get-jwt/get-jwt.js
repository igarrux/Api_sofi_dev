import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const keyPath = join(__dirname, '../../../../jwt/private.key')
config()
export const getJWT = (id) => {
	const key = fs.readFileSync(keyPath, { encoding: 'utf-8' })
	const token = jwt.sign({ id }, key)
	return token
}
