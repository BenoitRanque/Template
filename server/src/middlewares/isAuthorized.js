// roles
const ADMIN = 'ADMIN'
const MANAGER = 'MANAGER'
const SUPERVISOR = 'SUPERVISOR'
const HR = 'HR'

function isAuthorized (roles) {
  return (resolve, obj, args, ctx, info) => {
    if (ctx.session && ctx.session.user && ctx.session.user.roles && ctx.session.user.roles.some(role => roles.includes(role.name))) {
      return resolve(obj, args, ctx, info)
    }
    throw new Error(`Se require Authorización`)
  }
}

module.exports = {
  Mutation: {
    createUser: isAuthorized([ADMIN]),
    createException: isAuthorized([ADMIN, HR, SUPERVISOR]),
    deleteException: isAuthorized([ADMIN, SUPERVISOR]),
    rejectException: isAuthorized([ADMIN, HR]),
    authorizeException: isAuthorized([ADMIN, HR]),
    cancelException: isAuthorized([ADMIN, HR]),
    createEmployee: isAuthorized([ADMIN, HR]),
    updateEmployee: isAuthorized([ADMIN, HR]),
    createSchedule: isAuthorized([ADMIN, HR]),
    createShift: isAuthorized([ADMIN, HR]),
    updateShift: isAuthorized([ADMIN, HR]),
    deleteShift: isAuthorized([ADMIN, HR]),
    createDepartment: isAuthorized([ADMIN, HR]),
    updateDepartment: isAuthorized([ADMIN, HR]),
    deleteDepartment: isAuthorized([ADMIN, HR])
  }
}

