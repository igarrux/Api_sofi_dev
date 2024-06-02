import { Card } from '../../../database/model/cards/index.js'
import { errorsMapper } from '../../utils/mappers/errors.mapper.js'

export const ModifyCard = async (req, res) => {
	try {
		await Card.findByIdAndUpdate(req.body._id, req.body)
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
