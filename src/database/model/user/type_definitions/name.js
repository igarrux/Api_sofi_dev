import { errors } from "./messages/errors.js"
export const Name = {
	type: String,
	required: [true, errors.nameTooShort],
}
