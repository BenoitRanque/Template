module.exports = function handler (promise, params) {
  return  async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : []

    try {

      const result = await promise(...boundParams)

      return res.json(result || { message: 'OK' })

    } catch (error) {
      console.log(error)
      return res.status(500).end()
      // return res.status(500) && next(error)
    }
  }
}
