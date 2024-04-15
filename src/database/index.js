import { config } from 'dotenv'
import { connect } from 'mongoose'
config()

export const connectDB = async () => {
	try {
		await connect(process.env.MONGO_DB_URL)
		console.log('\x1b[36mDatabase connected')
	} catch (error) {
		throw new Error('Database connection failed', error)
	}
}
