import { Types } from 'mongoose'
import { diskStorage, MulterError } from 'multer'
import { extname } from 'path'
import { ERRORS } from './messages/error.js'
import { mkdirIfNotExist } from './mkdir_If_not_exist.js'
import { deleteSync } from 'del'

const destination = async (req, _, cb) => {
	if (!req.user_id) {
		cb(new MulterError(400, ERRORS.USER_ID_REQUIRED))
	}

	const dist = `public/${req.user_id}/images/`
	const error = await mkdirIfNotExist(dist)

	if (error) return cb(new MulterError(500, ERRORS.DEST_PROBLEM))
	cb(null, dist)
}

const filename = (req, file, cb) => {
	try {
		req.body._id = req.body._id ?? new Types.ObjectId()
		const EXT = extname(file.originalname)
		const FILE_NAME = req.body._id.toString() + EXT
		deleteSync(`public/${req.user_id}/images/${req.body._id}.*`)
		req.body.thumbnail = FILE_NAME
		cb(null, FILE_NAME)
	} catch (error) {
		cb(new MulterError(ERRORS.UPLOAD_GENERAL_ERROR))
	}
}

export const multerStorage = diskStorage({ destination, filename })
