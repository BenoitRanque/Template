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
    user: isAuthenticated,
    users: isAuthenticated,
    employee: isAuthenticated,
    employees: isAuthenticated,
    employeesConnection: isAuthenticated,
    schedule: isAuthenticated,
    schedules: isAuthenticated,
    schedulesConnection: isAuthenticated,
    shift: isAuthenticated,
    shifts: isAuthenticated,
    shiftsConnection: isAuthenticated,
    exception: isAuthenticated,
    exceptions: isAuthenticated,
    exceptionsConnection: isAuthenticated,
    department: isAuthenticated,
    departments: isAuthenticated
  },
  Mutation: {
    createUser: isAuthenticated,
    createException: isAuthenticated,
    createEmployee: isAuthenticated,
    updateEmployee: isAuthenticated,
    createSchedule: isAuthenticated,
    createShift: isAuthenticated,
    updateShift: isAuthenticated,
    deleteShift: isAuthenticated,
    createDepartment: isAuthenticated,
    updateDepartment: isAuthenticated,
    deleteDepartment: isAuthenticated
  }
}
