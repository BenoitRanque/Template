const SUPERVISOR = 'SUPERVISOR'

function supervisorIsOnlyRole(ctx) {
  return ctx.session.user.roles.filter(({ name }) => name !== SUPERVISOR).length === 0
}

function addSupervisorFilter (where, ctx) {
  return {
    ...(where ? where : {}),
    department: {
      ...(where && where.department && where.department ? where.department : {}),
      supervisors_some: {
        ...(where && where.department && where.department.supervisors_some ? where.department.supervisors_some : {}),
        id: ctx.session.user.id
      }
    }
  }
}

module.exports = {
  Query: {
    employees: async (resolve, data, args, ctx, info) => {
      if (supervisorIsOnlyRole(ctx)) {
        args.where = addSupervisorFilter(args.where, ctx)
      }
      return resolve(data, args, ctx, info)
    },
    employeesConnection: async (resolve, data, args, ctx, info) => {
      if (supervisorIsOnlyRole(ctx)) {
        args.where = addSupervisorFilter(args.where, ctx)
      }
      return resolve(data, args, ctx, info)
    },
    exceptions: async (resolve, data, args, ctx, info) => {
      if (supervisorIsOnlyRole(ctx)) {
        args.where = {
          ...(args.where ? args.where : {}),
          employee: addSupervisorFilter(args.where && args.where.employee ? args.where.employee : {}, ctx)
        }
      }
      return resolve(data, args, ctx, info)
    },
    exceptionsConnection: async (resolve, data, args, ctx, info) => {
      if (supervisorIsOnlyRole(ctx)) {
        args.where = {
          ...(args.where ? args.where : {}),
          employee: addSupervisorFilter(args.where && args.where.employee ? args.where.employee : {}, ctx)
        }
      }
      return resolve(data, args, ctx, info)
    }
  }
}