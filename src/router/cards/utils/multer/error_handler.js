import { MulterError } from 'multer'
import { ERRORS } from './messages/error.js'

export const multerErrorHandler = (err, _, res, next) => {
	if (err instanceof MulterError) {
		if (err.message === 'LIMIT_FILE_SIZE') {
			return res.status(413).send(ERRORS.LIMIT_FILE_SIZE)
		}
		return res.status(err.code).send(err.field)
	}
	next()
}
