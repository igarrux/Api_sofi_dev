import { ERRORS } from './messages/error.js'
import { MulterError } from 'multer'
import { ALLOWED_TYPES } from './mimes/allowed_types.js'

export const multerIMGFilter = (_, file, cb) => {
	if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true)
	else cb(new MulterError(415, ERRORS.INVALID_FORMAT), false)
}
