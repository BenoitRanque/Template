const { extractFragmentReplacements } = require('prisma-binding')

const resolvers = {
  Query: require('./Query'),
  Mutation: require('./Mutation'),
  AuthPayload: require('./AuthPayload'),
  Employee: require('./Employee'),
  AttendanceDate: require('./AttendanceReportDate'),
  AttendanceReport: require('./AttendanceReport')
}

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
