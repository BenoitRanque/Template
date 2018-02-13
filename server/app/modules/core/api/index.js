import express from 'express'

const router = express.Router()

router.use('/session', import('./session'))

export default router