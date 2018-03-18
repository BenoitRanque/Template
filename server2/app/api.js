import express from 'express'
import core from './modules/core/api'

export default express.Router()
  .use('/core', core)
