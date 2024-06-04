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
		//Require or add the _id
		const id = req.method == 'PATCH' ? req.params.id : new Types.ObjectId()
		req.body._id = id
		//Get the name
		const EXT = extname(file.originalname)
		const FILE_NAME = id.toString() + EXT

		//Remove prev images
		deleteSync(`public/${req.user_id}/images/${id}.*`)

		// Add the name of the image in the database
		req.body.thumbnail = FILE_NAME

		cb(null, FILE_NAME)
	} catch (error) {
		cb(new MulterError(ERRORS.UPLOAD_GENERAL_ERROR))
	}
}

export const multerStorage = diskStorage({ destination, filename })
