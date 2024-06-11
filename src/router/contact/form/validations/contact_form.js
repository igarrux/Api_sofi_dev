import { isValidObjectId } from 'mongoose'
import { httpError } from '../../../utils/mappers/http_errors.js'
import { ERRORS } from '../messages/errors.js'

const mailRgx = /^(\D(\w|\.)+@(\D)\w+\.\D(\w|\.)+)$/
export const ValidateContactForm = (req, res) => {
	const { name, email, message, subject, user_id } = req.body

	// name
	if (!name) return httpError(400, ERRORS.NAME_EMPTY, 'name')(res)
	if (name.length < 3) {
		return httpError(400, ERRORS.NAME_TOO_SHORT, 'name')(res)
	}
	//email
	if (!email) return httpError(400, ERRORS.EMAIL_EMPTY, 'email')(res)
	if (!mailRgx.test(email)) {
		return httpError(400, ERRORS.EMAIL_INVALID, 'email')(res)
	}

	//Message
	if (!message) return httpError(400, ERRORS.MESSAGE_EMPTY, 'message')(res)
	if (message.length < 22) {
		return httpError(400, ERRORS.MESSAGE_TOO_SHORT, 'message')(res)
	}

	//subject
	if (!subject) return httpError(400, ERRORS.SUBJECT_EMPTY, 'subject')(res)
	if (subject.length < 4) {
		return httpError(400, ERRORS.SUBJECT_TOO_SHORT, 'subject')(res)
	}

	// User id
	if (!user_id) return httpError(400, ERRORS.USER_ID_EMPTY, 'user')(res)
	if (!isValidObjectId(user_id)) {
		return httpError(400, ERRORS.USER_ID_INVALID, 'user')(res)
	}
	return true
}
