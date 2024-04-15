import { User } from '../../../../database/model/user/model.js'
import { compare } from 'bcrypt'

export const userIsValid = async (user) => {
	const { password, _id } = await User.findOne({ email: user.email })
	const passwordIsValid = await compare(user.password, password)
    return passwordIsValid? _id: false
}
