import { ERRORS } from './messages/errors.js'
export const UserName = {
	type: String,
	required: [true, ERRORS.USER_NAME_EMPTY],
	unique: true,
	minlength: [3, ERRORS.USER_NAME_TOO_SHORT],
}
