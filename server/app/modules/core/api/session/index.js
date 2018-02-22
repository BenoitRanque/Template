import express from 'express'
import bcrypt from 'bcrypt'
import { BCRYPT_SALT_ROUNDS } from '../../../../cfg'

const router = express.Router()



router.post('/login', function (req, res) {

  req.pg.any(require('./login.sql'), { username: req.body.username })
    .then(([user]) => {
      if (!user) { return res.status(403).end() }

      bcrypt.compare(req.body.password, user.password)
        .then(match => {
          if (!match) { return res.status(403).end() }

          delete user.password
          req.session.user = user
          res.status(200).json({ user })
        })
        .catch(err => {
          console.error(err)
          res.status(500).end()
        })
    })
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.status(200).end()
})

router.get('/hash', function (req, res) {
  bcrypt.hash('', BCRYPT_SALT_ROUNDS)
    .then(hash => {
      res.status(200).send(hash)
    })
    .catch(err => {
      console.error(err)
      res.status(500).end()
    })
})


export default router