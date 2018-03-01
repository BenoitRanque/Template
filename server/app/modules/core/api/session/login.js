import express from 'express'
import bcrypt from 'bcrypt'
import { BCRYPT_SALT_ROUNDS } from '../../../../cfg'

const QUERY = `
SELECT id, username, password FROM core_user WHERE username = $[username]
`

export default express.Router()
  .post('/login', function (req, res) {
    req.pg.any(QUERY, { username: req.body.username })
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
