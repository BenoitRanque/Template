module.exports = {
  first: (query, value) => query.limit(value),
  after: (query, value) => query.offset(value)
}