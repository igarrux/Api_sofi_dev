import { isObjectIdOrHexString } from 'mongoose'
import { Card } from '../../../database/model/cards/index.js'
import { upload } from '../utils/multer/upload.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'

export const ModifyCard = async (req, res, next) => {
	const { id } = req.params
	if (!isObjectIdOrHexString(id)) return res.status(400).send()
	try {
		const card = await Card.findById(req.params.id)
		if (!card) return res.status(404).send()
		if (card.owner != req.user_id) return res.status(401).send()
		await card.save()
		upload.single('thumbnail')(req, res, (err) => {
			if (err) return next(err)
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
