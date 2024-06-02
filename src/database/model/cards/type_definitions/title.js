import { ERRORS } from './messages/errors.js'
export const Title = {
	type: String,
	required: [true, ERRORS.TITLE_REQUIRED],
}
