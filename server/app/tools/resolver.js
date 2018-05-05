function encode (query) {
  return encodeURI(btoa(query))
}

function decode (query) {
  return atob(decodeURI(query))
}



module.exports = class Resolve {
  constructor (model, method, params, config) {
    // model: the model for the resolver instance
    // method: the main method for this resolver
    // params: returns additional params for resolver
    // config: additional options (auth etc)
    this.model = model
    this.method = method
    this.params = params
    this.config = { authenticate: true, authorize: true, ...config }

    return (req, res, next) => {
      let { ac, session, body } = req

      let context = { ac, session}
      let data = body

      let info = {
        action: 'read',
        ownership: 'boolean',
        graph: () => genEager(this.model, decode(req.query.graph)),
        graph: {
          eager
          allow
        }
      }

      try {
        let results = this.method(this.model, data, info, context)
        
        results = filter(results)

        res.status(200).json({ data: results })

      }
      catch (error) {
        console.log(error)
        res.status(500).end(error)
      }
    }
  }
}
// idea:
// create custom error Object
// use to provide more customized errors
class CustomErrror {
  constructor(httpStatusCode, message) {
    this.httpStatusCode = httpStatusCode
    this.message = message
  }
}

function resolve (model, method, params) {
  return async (req, res, next) => {
    try {
      // method is called with standarized options
      let config = {
        params = params(req, res, next),
        ac,
        session,
        action: 'read',
        own: false,
        data
      }
      let info = {
        action: 'stuff',
        own: true
      }
      // standarize paramsters
      // still needs more thought
      let result = await method(data, config, tools, info)

      res.status(200).send(result)
    } catch (error) {
      // an error has been caught
      return console.log(error)
      res.status(500).end()
    }
  }
}


let { ac, session, body } = req

let data = body.data
let context = { ac, session, query: new QueryObject(decode(req.params.query)) }
let info = {
  action: String,
  ownership: Boolean,
  query: ['field', {filter: 1}]
}


function action (info, data, context) {
   // take standarized params, return value, throw err
  // info: query information, such as action, ownership, eager, graph
  info = {
    action: 'read',
    own: true,
    eager: (model, query) => query.eager(...buildEager(model))
    graph: '' // desired graph upsert/insert authorization
  }
}

queryParams = {
  own: Boolean,
  query: ['field', { filter: 1, otherFilter: 2 }, 'field', 'field2']
}


router.route('/core/session').all(resolve(require('./action')))