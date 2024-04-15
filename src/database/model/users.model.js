import { model, Schema } from 'mongoose'

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		unique: true,
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})
export const User = model('users', userSchema)