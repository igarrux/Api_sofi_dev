import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './database/index.js'
import router from './router/router.js'
import cookieParser from 'cookie-parser'
const app = express()
const port = process.env.PORT || 3000
config()
connectDB()

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/', router)
app.use(express.static('public'))
app.listen(port, () => {
	console.log(`\x1b[35mApp listening on port ${port}\x1b[0m`)
})
