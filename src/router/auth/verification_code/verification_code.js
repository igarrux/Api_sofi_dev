import { Verifications } from '../../../database/model/verifications/verifications.js'
import { httpError } from '../../utils/mappers/http_errors.js'
import { ERRORS } from './messages/errors.js'
import { nanoid } from 'nanoid'
import { sendVerificationEmail } from './utils/send_verification_email.js'
import { logger } from '../../../logger.js'
export const verificationCode = async (req, res) => {
	try {
		const { user_name } = req.params
		const code = nanoid(8)
		if (!user_name) httpError(400, ERRORS.USER_NAME_EMPTY, 'body/user_name')
		const verification = new Verifications({
			user_name,
			verification: code,
		})
		await Verifications.deleteMany({ user_name })
		await verification.save()
		await sendVerificationEmail(user_name, code, res)
		res.status(200).send()
	} catch (error) {
		httpError(500, ERRORS.INTERNAL_ERROR, 'http/verification_code')(res)
		logger.Error(error, 'http/verification_code')
	}
}
