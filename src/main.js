import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './database/index.js'
import router from './router/router.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error_handler/errors_handler.js'
import cors from 'cors'
import { multerErrorHandler } from './router/utils/multer/error_handler.js'
const app = express()
const port = process.env.PORT || 3000
config()
connectDB()

if (
	!process.env.COOKIE_SECRET ||
	!process.env.JWT_SECRET ||
	!process.env.COOKIE_SECRET
)
	throw new Error('Missing enviroment variables')

app.use(
	cors({
		credentials: true,
		origin: process.env.CORS_ORIGIN.split(','),
		exposedHeaders: 'token',
	})
)
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(multerErrorHandler)
app.use('/', router)
app.use(express.static('public'))
app.use(errorHandler)
app.listen(port, () => {
	console.log(`\x1b[35mApp listening on port ${port}\x1b[0m`)
})
