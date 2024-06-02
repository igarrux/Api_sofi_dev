import { compare } from 'bcrypt'
import { User } from '../../../../../database/index.js'
export const validateCredentials = async (user) => {
	if (!user.password || !user.email) return false
	const { password, _id } = await User.findOne({ email: user.email })
	const passwordIsValid = await compare(user.password, password)
	return passwordIsValid? _id: false
}
