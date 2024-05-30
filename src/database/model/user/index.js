import { model, Schema } from 'mongoose'
import { defineName } from './definitions/name.js'
import { defineEmail } from './definitions/email.js'
import { definePassword } from './definitions/password.js'
import { hastPassword } from './parsers/password.js'

const userSchema = new Schema({
	name: defineName,
	email: defineEmail,
	password: definePassword,
	id: String
})
userSchema.pre('save', hastPassword)
export const User = model('users', userSchema)
