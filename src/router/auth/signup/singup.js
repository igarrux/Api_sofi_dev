import { User } from '../../../database/index.js'
import { ERRORS } from './errors_messages/error.messages.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'
import { httpError } from '../../utils/mappers/http_errors.js'
import { logger } from '../../../logger.js'
import { UploadPromise } from '../utils/multer/upload_prommise.js'
import multer from 'multer'

export const SingUp = async (req, res) => {
	if (!req.body) return res.status(400).send(ERRORS.BODY_EMPTY)
	try {
		const { body } = await UploadPromise('profile_img', req, res)
		const user = new User(body)
		await user.save()
		req.saveIMG()
	} catch (error) {
		const { code, name, keyPattern, errors } = error
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
		logger.Error(error)
		return
	}
	res.status(201).send()
}
