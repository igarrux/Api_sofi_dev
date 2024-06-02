import { Router } from 'express'
import { AddCard } from './add/add.js'
import { upload } from './utils/multer/upload.js'
import { multerErrorHandler } from './utils/multer/error_handler.js'
import { guard } from '../../guard.js'
const router = Router()

router.post('/add', guard, upload.single('thumbnail'), AddCard)

router.use(multerErrorHandler)
export { router as cardsRouter }
