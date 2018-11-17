const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

function isAuthenticated (resolve, obj, args, ctx, info) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const session = jwt.verify(token, APP_SECRET)
    return resolve(obj, args, { ...ctx, session }, info)
  }
  throw new Error('Se requiere Autenticación')
}

module.exports = {
  Query: {
    sessionUser: isAuthenticated,
    // user: isAuthenticated,
    // users: isAuthenticated,
    // employee: isAuthenticated,
    // employees: isAuthenticated,
    // employeesConnection: isAuthenticated,
    // schedule: isAuthenticated,
    // schedules: isAuthenticated,
    // schedulesConnection: isAuthenticated,
    // shift: isAuthenticated,
    // shifts: isAuthenticated,
    // shiftsConnection: isAuthenticated,
    // exception: isAuthenticated,
    // exceptions: isAuthenticated,
    // exceptionsConnection: isAuthenticated,
    // department: isAuthenticated,
    // departments: isAuthenticated
  },
  Mutation: {
    createUser: isAuthenticated,
    updateUser: isAuthenticated,
    createException: isAuthenticated,
    rejectException: isAuthenticated,
    authorizeException: isAuthenticated,
    cancelException: isAuthenticated,
    deleteException: isAuthenticated,
    createShift: isAuthenticated,
    updateShift: isAuthenticated,
    deleteShift: isAuthenticated,
    createEmployee: isAuthenticated,
    updateEmployee: isAuthenticated,
    createSchedule: isAuthenticated,
    createDepartment: isAuthenticated,
    updateDepartment: isAuthenticated,
    deleteDepartment: isAuthenticated
  }
}
