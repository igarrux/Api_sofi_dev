import { deleteSync } from 'del'
import { Card } from '../../../database/model/cards/index.js'
import { logger } from '../../../logger.js'
export const RemoveCard = async (req, res) => {
	try {
		const { id } = req.params
		deleteSync(`public/${req.user_id}/images/${id}.*`)
		const card = await Card.findById(id)
		if (card.owner != req.user_id) return res.status(401).send()
		await card.deleteOne()
		res.status(204).send()
	} catch (error) {
		logger.Error(error)
		res.status(500).send()
	}
}
