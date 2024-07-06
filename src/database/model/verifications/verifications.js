import { model, Schema } from 'mongoose'
import { hashVerification } from './parsers/verification.js'

const verificationSchema = new Schema({
	verification: String,
	user_name: {
		required: true,
		Type: String,
	},
	createAt: {
		type: Date,
		default: Date.now,
		expires: '20s',
	},
})
verificationSchema.pre('save', hashVerification)
export const Verifications = model('verifications', verificationSchema)
