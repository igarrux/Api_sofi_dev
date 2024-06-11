import express from 'express'
import { authRouter } from './auth/router.js'
import { cardsRouter } from './cards/router.js'
import { contactRouter } from './contact/router.js'

const router = express.Router()

router.use('/auth/', authRouter)
router.use('/cards/', cardsRouter)
router.use('/contact', contactRouter)
export default router
