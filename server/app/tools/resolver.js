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

function resolve (method, params) {
  return async (req, res, next) => {
    try {
      // method is called with standarized options
      let config = {
        params = params(req, res, next),
        data: req.body,
        ac,
        session,
        action: 'read',
        own: false,
        data
      }

      let result = await method(data, config, tools, info)

      res.status(200).send(result)
    } catch (error) {
      // an error has been caught
      return console.log(error)
      res.status(500).end()
    }
  }
}


function action () {
   // take standarized params, return value, throw err

}




router.route('/core/session').all(resolve(require('./action')))