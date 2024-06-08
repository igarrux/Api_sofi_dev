import { Router } from 'express'
import { AddCard } from './add/add.js'
import { upload } from './utils/multer/upload.js'
import { multerErrorHandler } from './utils/multer/error_handler.js'
import { guard } from '../../guard.js'
import { ModifyCard } from './modify/modify.js'
import { RemoveCard } from './remove/remove.js'
import multer from 'multer'
import { getCards } from './get/get.js'
const router = Router()

router.post('/', guard, upload.single('thumbnail'), AddCard)
router.patch('/:id', guard, ModifyCard)
router.delete('/:id', guard, RemoveCard)
router.get('/:id', getCards)

router.use(multerErrorHandler)
export { router as cardsRouter }
