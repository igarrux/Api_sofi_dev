import { isValidObjectId } from 'mongoose'
import { Card } from '../../../database/model/cards/index.js'
import { logger } from '../../../logger.js'
import { httpError } from '../../utils/mappers/http_errors.js'
import { ERRORS } from '../../../messages/errors.js'

export const getCards = async (req, res) => {
	const id = req.params.id || req.user_id
	try {
		if (!isValidObjectId(id)) {
			return httpError(400, ERRORS.INVALID_OBJECT_ID, 'objectID')(res)
		}
		const cards = await Card.find({ owner: id })
		res.status(200).json(cards)
	} catch (error) {
		logger.Error(error)
		res.status(500).end()
	}
}
