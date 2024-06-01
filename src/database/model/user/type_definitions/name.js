import { errors } from "./error_messages/error.messages.js"
export const Name = {
	type: String,
	required: [true, errors.nameTooShort],
}
