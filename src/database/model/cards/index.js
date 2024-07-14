import { model, Schema, ObjectId } from 'mongoose'
import { Thumbnail } from './type_definitions/thumbnail.js'

const cardSchema = new Schema({
	thumbnail: Thumbnail,
	title: String,
	description: String,
	repository_link: String,
	demo_link: String,
	owner: ObjectId,
	skills: [String],
	id: String,
})
export const Card = model('cards', cardSchema)
