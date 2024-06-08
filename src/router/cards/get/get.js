import { Card } from '../../../database/model/cards/index.js'

export const getCards = async (req, res) => {
	const { id } = req.params
	try {
		const cards = await Card.find({ owner: id })
		res.status(200).json(cards)
	} catch (error) {
		res.status(500).end()
	}
}
