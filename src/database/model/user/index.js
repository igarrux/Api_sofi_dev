import { model, Schema } from 'mongoose'
import { Name } from './type_definitions/name.js'
import { Email } from './type_definitions/email.js'
import { Password } from './type_definitions/password.js'
import { hastPassword } from './parsers/password.js'
import { UserName } from './type_definitions/user_name.js'

const userSchema = new Schema({
	name: Name,
	email: Email,
	password: Password,
	id: String,
	user_name: UserName,
	profile_img: String
})
userSchema.pre('save', hastPassword)
export const User = model('users', userSchema)
