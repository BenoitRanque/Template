import express from 'express'
import authorize from '../../../../../utils/authorize'
import GET from './get'
import POST from './post'
import PUT from './put'
import DELETE from './delete'

const router = express.Router()

router.route('/users')
  .all(authorize)
  .get(GET)
  .post(POST)
  .put(PUT)
  .delete(DELETE)

export default router