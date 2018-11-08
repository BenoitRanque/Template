const { extractFragmentReplacements } = require('prisma-binding')

const resolvers = {
  // Node: require('./Node'),
  Query: require('./Query'),
  Mutation: require('./Mutation'),
  AuthPayload: require('./AuthPayload'),
  Employee: require('./Employee'),
  AttendanceReport: require('./AttendanceReport'),
  AttendanceReportDate: require('./AttendanceReportDate'),
  CalendarDate: require('./CalendarDate'),
}

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
