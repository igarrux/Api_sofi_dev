import { User } from '../../../database/index.js'
import { userDataMapper } from './utils/mappers/user_data.mapper.js'

export const GetUserInfo = async (req, res) => {
	try {
		const userData = await User.findById(req.user_id)
		const userInfo = userDataMapper(userData)
		res.status(200).json(userInfo)
	} catch (error) {
		res.status(500).end()
	}
}
