import express from 'express'
import authenticate from '../../../../utils/authenticate';

export default express.Router()
  .get('/logout', authenticate, (req, res) => {
    req.session.destroy()
    res.status(200).end()
  })