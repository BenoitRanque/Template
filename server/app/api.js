import express from 'express'

const router = express.Router()

router.use('/api', import('./modules/core/api'))

export default router