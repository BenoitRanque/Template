import express from 'express'
import bcrypt from 'bcrypt'
import { BCRYPT_SALT_ROUNDS } from '../../../../cfg'
import authorize from '../../../../utils/authorize'

// export default express.Router()
//   .route('/user')
//   .get('/logout', (req, res) => {
//     req.session.destroy()
//     res.status(200).end()
//   })

export default express.Router()
  .all(authorize)
  .get('/user', (req, res) => {

    let query = `
      SELECT id, username, password FROM core_user WHERE id = $[id]
    `

    req.pg.one(query, { id: req.session.user.id }).then(user => {
      res.status(200).send({ user })
    })
  })
  .put('/user', (req, res) => {

    if (req.data.user.password === undefined) {
      let query = `
        UPDATE "core_user"
        SET
          "username" = $[username]
        WHERE id = $[id]
      `
      
      req.pg(query, {
        id: req.session.user.id,
        username: req.body.user.username
      })
        .then(({ user }) => {
          res.status(200).send({ user })
        })
    }
    else {
      let query = `
        UPDATE "core_user"
        SET
        "username" = $[username],
        "password" = $[password]
        WHERE id = $[id]
      `
      
      bcrypt.hash(req.body.user.password, BCRYPT_SALT_ROUNDS).then(hash => {
        req.pg(query, {
          id: req.session.user.id,
          username: req.body.user.username,
          password: hash
        })
          .then(({ user }) => {
            res.status(200).send({ user })
          })
      })
      
    }
  })
