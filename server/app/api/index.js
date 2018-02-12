import express from 'express'
import core from './core'

const router = express.Router()

router.post('/test', (req, res) => {
  req.session.message = req.body.message
  res.status(200).send()
})

router.get('/test', (req, res) => {
  res.status(200).json(req.session.message)
})

router.get('/session', (req, res) => {
  res.status(200).json(req.session)
})

router.use(core)

export default router
