import authenticate from './authenticate'

const examplePrivileges = [
  {
    name: 'somename',
    about: 'about',
    table: 'table',
    methods: ['GET'],
    fields: ['*', 'field'],
    owner: true
  }
]

export default function(req, res, next) {
  authenticate(req, res, () => {
    const
      table = req.params.table,
      method = req.method,
      fields = req.params.fields,
      owner = req.params.owner

    if (auth()) {
      next()
    }
    else {
      res.status(403).send('Access denied')
    }

    function auth () {
      
      if (req.session.user.privileges.some(p => {
        // match at least one existing privilege with privileges required for query
        if (
          // collection match
          (p.table === table) &&
          // method match
          (p.method.includes(method)) &&
          // has wildcard, or every requested field is included in existing allowed fields
          (p.fields[0] === '*' || (fields && fields.every(f => p.fields.includes(f)))) &&
          // ownership not required in privilege, or part of the query
          (p.owner === false || owner)
        ) { 
          return true 
        }
        else {
          return false
        }
      })) {
        return true
      }
      return false
    }
  })
}
