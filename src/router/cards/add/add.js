import { Card } from '../../../database/model/cards/index.js'
import { errorsMapper } from '../../utils/mappers/errors.mapper.js'

export const AddCard = (req, res) => {
	const cardData = { ...req.body, owner: req.user_id }
	const card = new Card(cardData)
	try {
		card.save()
	} catch (error) {
		if (error.name === 'ValidationError') {
			res.status(400).send(errorsMapper(error.errors))
			return
		}
		res.status(500).send()
		return
	}
	res.status(201).send()
}
