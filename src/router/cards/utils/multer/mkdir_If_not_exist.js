import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

export const mkdirIfNotExist = async (path) => {
	try {
		if (!existsSync(path)) await mkdir(path, { recursive: true })
		return null
	} catch (error) {
		return error
	}
}
