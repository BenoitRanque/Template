import express from 'express'
import authorize from '../../../../utils/authorize'

const router = express.Router()

router.get('users', authorize('core', 'sysadmin/users', 'get'), function (req ,res) {
  req.pg.many(require('./users_get.sql')).then(users => {
    res.status(200).send({ users })
  })
})

router.post('users', authorize('core', 'sysadmin/users', 'post'), function (req ,res) {
  req.pg.one(require('./users_post.sql')).then(user => {
    res.status(200).send({ user })
  })
})

router.put('users', authorize('core', 'sysadmin/users', 'put'), function (req ,res) {
  req.pg.one(require('./users_put.sql')).then(user => {
    res.status(200).send({ user })
  })
})

router.delete('users', authorize('core', 'sysadmin/users', 'delete'), function (req ,res) {
  req.pg.any(require('./users_delete.sql')).then(user => {
    res.status(200).user({ user })
  })
})

export default router