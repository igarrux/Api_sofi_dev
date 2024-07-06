import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { logger } from '../../../logger.js'

export const mkdirIfNotExist = async (path) => {
	try {
		if (!existsSync(path)) await mkdir(path, { recursive: true })
		return null
	} catch (error) {
		logger.Error(error)
		return error
	}
}
