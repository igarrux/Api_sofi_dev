import { config } from 'dotenv'
import { User } from '../../../../database/index.js'
import { sendMail } from '../../../../email/email.js'
import { logger } from '../../../../logger.js'
import { ERRORS } from '../messages/errors.js'
import { httpError } from '../../../utils/mappers/http_errors.js'
config()
const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN
if (!EMAIL_DOMAIN) throw new Error('EMAIL_DOMAIN not found, check .env')
export const sendVerificationEmail = async (user_name, code, res) => {
	const userAdmin = await User.findOne({ user_name })
	if (!userAdmin) return res.status(401).send()

	try {
		// Send email to admin
		await sendMail({
			from: `Security API Sofi <security@${EMAIL_DOMAIN}>`,
			to: userAdmin.email,
			subject: 'Restablecer contraseña y otros datos',
			template: 'verification',
			ctx: {
				name: userAdmin.name,
				code,
			},
		})
	} catch (error) {
		logger.Error(error, ERRORS.MAILER_ERROR)
		httpError(500, ERRORS.MAILER_ERROR, 'http/verification_code')(res)
	}
}
