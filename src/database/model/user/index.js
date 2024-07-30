import { model, Schema } from 'mongoose'
import { Name } from './type_definitions/name.js'
import { Email } from './type_definitions/email.js'
import { Password } from './type_definitions/password.js'
import { hastPassword } from './parsers/password.js'
import { UserName } from './type_definitions/user_name.js'

const userSchema = new Schema(
	{
		name: Name,
		email: Email,
		password: Password,
		id: String,
		user_name: UserName,
		img_ext: {
			type: String,
			default: 'none',
		},
	},
	{ timestamps: true }
)
userSchema.pre('save', hastPassword)
userSchema.pre('updateOne', hastPassword)
export const User = model('users', userSchema)
