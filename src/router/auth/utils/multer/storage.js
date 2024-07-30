import { Types } from 'mongoose'
import { diskStorage, MulterError } from 'multer'
import { extname } from 'path'
import { ERRORS } from '../../../utils/multer/messages/error.js'
import { mkdirIfNotExist } from '../../../utils/mkdir/mkdir_If_not_exist.js'
import { deleteSync } from 'del'
import { logger } from '../../../../logger.js'
import fs from 'fs'
const destination = async (req, _, cb) => {
	const dist = `temp/profiles`
	const error = await mkdirIfNotExist(dist)

	if (error) return cb(new MulterError(500, ERRORS.DEST_PROBLEM))
	cb(null, dist)
}

const filename = (req, file, cb) => {
	try {
		let userName = ''
		if (req.method == 'POST') userName = req.body.user_name
		if (req.method == 'PATCH') userName = req.params.user_name
		//Get the name
		const EXT = extname(file.originalname).replace('.', '')
		const FILE_NAME = userName + '.' + EXT

		// Add the extension of the image in the database
		req.body.img_ext = EXT

		req.saveIMG = async () => {
			//Remove prev images
			await mkdirIfNotExist('public/profiles/')
			deleteSync(`public/profiles${userName}.*`)

			fs.renameSync(
				`temp/profiles/${FILE_NAME}`,
				`public/profiles/${FILE_NAME}`
			)
			//Clear temp folder
			deleteSync(`temp/profiles/*`)
		}

		cb(null, FILE_NAME)
	} catch (error) {
		logger.Error(error)
		cb(new MulterError(500, ERRORS.UPLOAD_GENERAL_ERROR))
	}
}

export const multerStorage = diskStorage({ destination, filename })
