import express from 'express'
import core from './modules/core/api'

const router = express.Router()

router.use(core)

export default router