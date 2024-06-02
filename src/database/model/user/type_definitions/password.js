import { ERRORS } from './messages/errors.js'
export const Password = {
	type: String,
	required: [true, ERRORS.PASSWORD_EMPTY],
	validate: {
		validator: (text) => text.length >= 8,
		message: ERRORS.PASSWORD_TO_SHORT,
	},
	min: [8, ERRORS.PASSWORD_TO_SHORT],
}
