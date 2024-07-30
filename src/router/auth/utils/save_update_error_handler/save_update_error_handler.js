import { ERRORS } from './messages/error.messages.js'
import { httpError } from '../../../utils/mappers/http_errors.js'
import { dbHttpError } from '../../../utils/mappers/db_http_errors.mapper.js'
import { logger } from '../../../../logger.js'
import { MulterError } from 'multer'
export const saveUpdateErrorHandler = (error, res) => {
	const { code, name, keyPattern, errors } = error
	if (code === 11000 && keyPattern.email) {
		return httpError(409, ERRORS.EMAIL_DIPLICATED, 'email')(res)
	}
	if (code === 11000 && keyPattern.user_name) {
		return httpError(409, ERRORS.USER_NAME_DUPLICATED, 'user_name')(res)
	}
	if (name === 'ValidationError') return dbHttpError(errors, 400)(res)
	if (error instanceof MulterError) {
		return httpError(error.code, error.field, 'image')(res)
	}
	if (name != 'ValidationError' && code != 11000) {
		res.status(500).send(ERRORS.INTERNAL_ERROR)
	}
	logger.Error('save-update', error)
}
