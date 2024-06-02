import { ERRORS } from './messages/errors.js'
export const Name = {
	type: String,
	required: [true, ERRORS.NAME_TOO_SHORT],
}
