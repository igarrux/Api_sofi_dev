import { ERRORS } from './messages/errors.js'
const validate = {
	validator: (text) => /^(\D(\w|\.)+@(\D)\w+\.\D(\w|\.)+)$/.test(text),
	message: ERRORS.INVALID_EMAIL,
}

export const Email = {
	unique: true,
	type: String,
	required: [true, ERRORS.EMAIL_EMPTY],
	validate,
}
