import { User } from '../../../database/index.js'
import { ERRORS } from './errors_messages/error.messages.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'
import { httpError } from '../../cards/utils/mappers/http_errors.js'

export const SingUp = async (req, res) => {
	if (!req.body) return res.status(400).send(ERRORS.BODY_EMPTY)
	const user = new User(req.body)

	try {
		await user.save()
	} catch ({ code, name, keyPattern, errors }) {
		//Duplicated errors
		if (code === 11000 && keyPattern.email) {
			return httpError(409, ERRORS.EMAIL_DIPLICATED, 'email')(res)
		}
		if (code === 11000 && keyPattern.user_name) {
			return httpError(409, ERRORS.USER_NAME_DUPLICATED, 'user_name')(res)
		}
		if (name === 'ValidationError') return dbHttpError(errors, 400)(res)

		if (name != 'ValidationError' && code != 11000) {
			res.status(500).send(ERRORS.INTERVAL_ERROR)
		}
		return
	}
	res.status(201).send()
}
