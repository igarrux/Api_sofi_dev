import { User } from '../../../database/index.js'
import { errors } from './errors_messages/error.messages.js'
import { errorsMapper } from '../../utils/mappers/errors.mapper.js'

export const SingUp = async (req, res) => {
	if (!req.body) return res.status(400).send(errors.bodyEmpty)
	const user = new User(req.body)

	try {
		await user.save()
	} catch (error) {
		//Duplicated errors
		if (error.code === 11000) {
			const isEmailDiplicated = !!error.keyPattern.email
			let errorMsg = errors.emailDiplicated
			if (!isEmailDiplicated) errorMsg = errors.usernameDiplicated
			res.status(409).send(errorMsg)
			return
		}

		if (error.name === 'ValidationError') {
			res.status(400).send(errorsMapper(error.errors))
			return
		}
		if (error && error.name != 'ValidationError' && error.code != 11000) {
			res.status(500).send(errors.interlSeverError)
		}
		return
	}
	res.status(201).send()
}
