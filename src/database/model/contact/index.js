import { model, Schema, ObjectId } from 'mongoose'

const contactSchema = new Schema({
	content: String,
	title: String,
    sender: String,
	owner: ObjectId,
})
export const Contact = model('contact-forms', contactSchema)
