import { isObjectIdOrHexString } from 'mongoose'
import { Card } from '../../../database/model/cards/index.js'
import { upload } from '../utils/multer/upload.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'

export const ModifyCard = async (req, res, next) => {
	const { id } = req.params
	try {
		if (!isObjectIdOrHexString(id)) return res.status(400).send()
		//Verify if the card exists
		const card = await Card.findById(req.params.id)
		if (!card) return res.status(404).send()
		//Verify if the card belongs to the user
		if (card.owner != req.user_id) return res.status(401).send()

		//Update the thumbnail
		upload.single('thumbnail')(req, res, async (err) => {
			if (err) return next(err)
			const { _id, ...newData } = req.body
			//Update the card
			await card.updateOne(newData)
			res.status(204).send()
		})
	} catch (error) {
		if (error.name === 'ValidationError') {
			dbHttpError(error.errors, 400)(res)
			return
		}
		res.status(500).send()
		return
	}
}
