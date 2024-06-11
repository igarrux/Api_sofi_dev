import { Card } from '../../../database/model/cards/index.js'
import { logger } from '../../../logger.js'
import { dbHttpError } from '../../utils/mappers/db_http_errors.mapper.js'

export const AddCard = async (req, res) => {
	try {
		const cardData = { ...req.body, owner: req.user_id }
		const card = new Card(cardData)
		await card.save()
		res.status(201).send()
	} catch (error) {
		if (error.name === 'ValidationError') {
			return dbHttpError(error.errors, 400)(res)
		}
		logger.Error(error)
		res.status(500).send()
		return
	}
}
