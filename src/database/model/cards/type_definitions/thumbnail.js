import { ERRORS } from './messages/errors.js'
export const Thumbnail = {
	type: String,
	required: [true, ERRORS.THUMBNAIL_REQUIRED],
}
