import { errors } from './error_messages/error.messages.js'
const validate = {
	validator: (text) => /^(\D(\w|\.)+@(\D)\w+\.\D(\w|\.)+)$/.test(text),
	message: errors.invalidEmail,
}

export const Email = {
	unique: true,
	type: String,
	required: [true, errors.emailEmpty],
	validate,
}
