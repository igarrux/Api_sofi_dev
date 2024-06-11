import { Card } from '../../../database/model/cards/index.js'
import { logger } from '../../../logger.js'

export const getCards = async (req, res) => {
	const { id } = req.params
	try {
		const cards = await Card.find({ owner: id })
		res.status(200).json(cards)
	} catch (error) {
		logger.Error(error)
		res.status(500).end()
	}
}
