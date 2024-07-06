import { User } from '../../../database/index.js'
import { ERRORS } from './messages/errors.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'
import { httpError } from '../../utils/mappers/http_errors.js'
import { logger } from '../../../logger.js'
import { UploadPromise } from '../utils/multer/upload_prommise.js'
import { verifyCode } from './validations/verify_code.js'
import { Verifications } from '../../../database/model/verifications/verifications.js'

export const updateUser = async (req, res) => {
	if (!req.params.user_name)
		return res.status(400).send(ERRORS.USER_NAME_EMPTY)
	try {
		const { user_name } = req.params
		const { body } = await UploadPromise('profile_img', req, res)
		const verification = await Verifications.findOne({ user_name })
		if ((await verifyCode(body.code, verification, res)) != true) return
		const { _id, ...updateData } = body
		await User.updateOne({ user_name }, updateData)
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
			res.status(500).send(ERRORS.INTERNAL_ERROR)
		}
		logger.Error(error)
		return
	}
	res.status(201).send()
}
