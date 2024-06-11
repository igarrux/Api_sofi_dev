import { Router } from 'express'
import { ContactForm } from './form/form.js'

const router = Router()
router.post('/', ContactForm)

export { router as contactRouter }
