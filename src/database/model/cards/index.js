import { model, Schema, ObjectId  } from 'mongoose'

const cardSchema = new Schema({
	thumbnail: Thumbnail,
	title: Email,
	description: Description,
	repository_link: String,
	demo_link: String,
	owner: ObjectId,
	id: String,
})
export const Card = model('cards', cardSchema)
