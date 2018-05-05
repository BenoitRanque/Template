module.exports = class Resolve {
  constructor (method) {
    return (req, res, next) => {
      try {
        let result 
      } catch (error) {
        
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


function action (info, data, config) {
   // take standarized params, return value, throw err
  // info: query information, such as action, ownership, eager, graph
  info = {
    action: 'read',
    own: true,
    eager: (model, query) => query.eager(...buildEager(model))
    graph: '' // desired graph upsert/insert authorization
  }
}




router.route('/core/session').all(resolve(require('./action')))