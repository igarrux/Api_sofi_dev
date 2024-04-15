import { errors } from "../error_messages/error.messages.js"
export const defineName = {
	type: String,
	required: [true, errors.nameTooShort],
}
