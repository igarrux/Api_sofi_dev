import multer from 'multer'
import { multerStorage } from './storage.js'
import { multerIMGFilter } from './filters.js'
export const upload = multer({
	storage: multerStorage,
	fileFilter: multerIMGFilter,
})

