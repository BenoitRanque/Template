const router = require('express').Router()

router.route('core')

module.exports = router



// example query
`
resource {
  subresource (filter: value, last: value) {
    subsurresoure
  }
}
`