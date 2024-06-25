import { config } from 'dotenv'
import { User } from '../../../../database/index.js'
import { sendMail } from '../../../../email/email.js'
import { logger } from '../../../../logger.js'
import { ERRORS } from '../messages/errors.js'
config()
const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN
if (!EMAIL_DOMAIN) throw new Error('EMAIL_DOMAIN not found, check .env')
export const contactSendEmail = async (req, res) => {
	const user_form = req.body
	const userAdmin = await User.findById(req.body.user_id)
	if (!userAdmin) return res.status(401).send()

	try {
		//Send email to user
		await sendMail({
			from: `${userAdmin.user_name}@${EMAIL_DOMAIN}`,
			to: user_form.email,
			subject: `De ${userAdmin.user_name}: Gracias por tu mensaje`,
			template: 'contact',
			ctx: {
				name: user_form.name,
				admin_name: userAdmin.name,
			},
		})

		// Send email to admin
		await sendMail({
			from: `info@${EMAIL_DOMAIN}`,
			to: userAdmin.email,
			subject: user_form.subject,
			template: 'contact_admin',
			ctx: {
				subject: user_form.subject,
				message: user_form.message,
				name: user_form.name,
				email: user_form.email,
			},
		})
	} catch (error) {
		logger.Error(error, ERRORS.MAILER_ERROR)
	}
}
