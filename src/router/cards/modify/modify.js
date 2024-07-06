import { isObjectIdOrHexString } from 'mongoose'
import { Card } from '../../../database/model/cards/index.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'
import { UploadPromise } from '../utils/multer/upload_prommise.js'
import { MulterError } from 'multer'
import { multerErrorHandler } from '../../utils/multer/error_handler.js'
import { logger } from '../../../logger.js'

export const ModifyCard = async (req, res) => {
	const { id } = req.params
	try {
		if (!isObjectIdOrHexString(id)) return res.status(400).send()
		//Verify if the card exists
		const card = await Card.findById(req.params.id)
		if (!card) return res.status(404).send()

		//Verify if the card belongs to the user
		if (card.owner != req.user_id) return res.status(401).send()

		// Update the thumbnail
		const { body } = await UploadPromise('thumbnail', req, res)
		const { _id, ...newData } = body
		await card.updateOne(newData)
		res.status(204).send()
	} catch (error) {
		if (error.name === 'ValidationError') {
			return dbHttpError(error.errors, 400)(res)
		}
		if (error instanceof MulterError) {
			return multerErrorHandler(error, null, res)
		}
		logger.Error(error)
		res.status(500).send()
	}
}
