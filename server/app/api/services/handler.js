module.exports = function handler (promise, params) {
  return  async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : []

    try {

      const result = await promise(...boundParams)

      return res.json(result || { message: 'OK' })

    }
    catch (error) {
      switch (error.message) {
        case 500:
        case 401:
        case 403:
          res.status(error.message).end()
          break
        default:
          console.log(error)
          res.status(500).end()
      }
    }
  }
}
