import { errors } from './messages/errors.js'
export const Password = {
	type: String,
	required: [true, errors.passwordEmpty],
	validate: {
		validator: (text) => text.length >= 8,
		message: errors.passwordTooShort,
	},
	min: [8, errors.passwordTooShort],
}
