import { User } from '../../../database/index.js'
import { ERRORS } from './errors_messages/error.messages.js'
import { errorsMapper } from '../../utils/mappers/errors.mapper.js'

export const SingUp = async (req, res) => {
	if (!req.body) return res.status(400).send(ERRORS.BODY_EMPTY)
	const user = new User(req.body)

	try {
		await user.save()
	} catch (error) {
		//Duplicated errors
		if (error.code === 11000) {
			const isEmailDiplicated = !!error.keyPattern.email
			let errorMsg = ERRORS.EMAIL_DIPLICATED
			if (!isEmailDiplicated) errorMsg = ERRORS.USER_NAME_DUPLICATED
			console.log(errorMsg)
			res.status(409).send(errorMsg)
			return
		}

		if (error.name === 'ValidationError') {
			res.status(400).send(errorsMapper(error.errors))
			return
		}
		if (error && error.name != 'ValidationError' && error.code != 11000) {
			res.status(500).send(ERRORS.INTERVAL_ERROR)
		}
		return
	}
	res.status(201).send()
}
