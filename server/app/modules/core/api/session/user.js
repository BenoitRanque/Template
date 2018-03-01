import express from 'express'
import authorize from '../../../../utils/authorize'

// export default express.Router()
//   .route('/user')
//   .get('/logout', (req, res) => {
//     req.session.destroy()
//     res.status(200).end()
//   })

export default express.Router()
  .all(authorize())
  .get('/user', (req, res) => {

    let query = `
      SELECT id, username, password FROM core_user WHERE id = $[id]
    `

    req.pg.one(query, { id: req.session.user.id }).then(user => {
      res.status(200).send({ user })
    })
  })
  .put('/user', (req, res) => {

    let query = `
      UPDATE "core_user"
      SET
        "username" = $[username],
        "username" = $[username],
        "username" = $[username],
      WHERE id = $[id]
    `
    req.pg.one(query, { id: req.session.user.id }).then(user => {
      res.status(200).send({ user })
    })
  })
