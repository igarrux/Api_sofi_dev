import { model, Schema } from 'mongoose'
import { Name } from './type_definitions/name.js'
import { Email } from './type_definitions/email.js'
import { Password } from './type_definitions/password.js'
import { hastPassword } from './parsers/password.js'

const userSchema = new Schema({
	name: Name,
	email: Email,
	password: Password,
	id: String
})
userSchema.pre('save', hastPassword)
export const User = model('users', userSchema)
