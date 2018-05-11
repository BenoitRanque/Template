const ErrorTypes = [
  {
    errorId: 400,
    statusCode: 400,
    message: message => message ? `Bad Request: ${message}` : 'Bad Request'
  },
  {
    errorId: 401,
    statusCode: 401,
    message: message => message ? `Unauthorized: ${message}` : `Unauthorized`
  },
  {
    errorId: 403,
    statusCode: 403,
    message: message => message ? `Forbidden: ${message}` : 'Forbidden'
  }
]

module.exports = class ServerError {
  constructor (errorId, errorMessage) {
    let error = ErrorTypes.find(error => error.errorId === errorId)
    if (!error) throw new Error(`Unknow Error Id ${errorId}`)

    this.statusCode = error.statusCode
    this.message = error.message(errorMessage)
  }
}
