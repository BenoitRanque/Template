import express from 'express'
import session from './session'
import sysadmin from './sysadmin'

const router = express.Router()

router.use('/session', session)
router.use('/sysadmin', sysadmin)

export default router