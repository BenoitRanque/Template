import express from 'express'
import users from './users'

export default express.Router()
  .use(users)
