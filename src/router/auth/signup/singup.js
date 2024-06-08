import { User } from '../../../database/index.js'
import { ERRORS } from './errors_messages/error.messages.js'
import { errorsMapper } from '../../utils/mappers/errors.mapper.js'
import { httpError } from '../../cards/utils/mappers/http_errors.js'

export const SingUp = async (req, res) => {
	if (!req.body) return res.status(400).send(ERRORS.BODY_EMPTY)
	const user = new User(req.body)

	try {
		await user.save()
	} catch (error) {
		//Duplicated errors
		if (error.code === 11000 && error.keyPattern.email) {
			httpError(409, ERRORS.EMAIL_DIPLICATED, 'email')(res)
		}
		if (error.code === 11000 && error.keyPattern.user_name) {
			httpError(409, ERRORS.USER_NAME_DUPLICATED, 'user_name')(res)
		}
		if (error.name === 'ValidationError') {
			res.status(400).send(errorsMapper(error.errors))
		}
		if (error && error.name != 'ValidationError' && error.code != 11000) {
			res.status(500).send(ERRORS.INTERVAL_ERROR)
		}
		return
	}
	res.status(201).send()
}
