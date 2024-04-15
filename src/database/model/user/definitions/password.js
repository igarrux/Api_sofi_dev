import { errors } from '../error_messages/error.messages.js'
export const definePassword = {
	type: String,
	required: [true, errors.passwordEmpty],
	validate: {
		validator: (text) => text.length >= 8,
		message: errors.passwordTooShort,
	},
	min: [8, errors.passwordTooShort],
}
