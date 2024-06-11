import { config } from 'dotenv'
import { createTransport } from 'nodemailer'
import { pugEngine } from 'nodemailer-pug-engine'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import util from 'util'
config()

const __dirname = dirname(fileURLToPath(import.meta.url))
if (
	!process.env.EMAIL_HOST ||
	!process.env.EMAIL_PORT ||
	!process.env.EMAIL_USER_NAME ||
	!process.env.EMAIL_PASSWORD
) {
	throw new Error(
		`Missing email environment variables:
        EMAIL_HOST, EMAIL_PORT,EMAIL_USER_NAME or EMAIL_PASSWORD`
	)
}

const mailer = createTransport({
	host: process.env.EMAIL_HOST,
	port: parseInt(process.env.EMAIL_PORT),
	auth: {
		user: process.env.EMAIL_USER_NAME,
		pass: process.env.EMAIL_PASSWORD,
	},
})

mailer.use(
	'compile',
	pugEngine({
		templateDir: path.join(__dirname, './templates'),
		pretty: true,
	})
)

export { mailer }
export const sendMail = util.promisify(mailer.sendMail).bind(mailer)
