import multer from 'multer'
import { multerStorage } from './storage.js'
import { multerIMGFilter } from '../../../utils/multer/img_filters.js'
export const upload = multer({
	storage: multerStorage,
	fileFilter: multerIMGFilter,
})

