import express from 'express'
import { authRouter } from './auth/router.js'
import { cardsRouter } from './cards/router.js'

const router = express.Router()

router.use('/auth/', authRouter)
router.use('/cards/', cardsRouter)

export default router
