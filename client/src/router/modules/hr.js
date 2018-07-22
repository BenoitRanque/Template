export default {
  hash: 'hr',
  layout: 'index',
  meta: {
    label: 'hr',
    requireAuthentication: true
  },
  tabs: [
    {
      hash: 'employees',
      layout: 'workspace',
      meta: {
        label: 'employees',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'HREmployee',
          posession: 'any'
        }
      }
    },
    {
      hash: 'break',
      layout: 'workspace',
      meta: {
        label: 'attbreak',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'HRAttBreak',
          posession: 'any'
        }
      }
    },
    {
      hash: 'type',
      layout: 'workspace',
      meta: {
        label: 'atttype',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'HRAttType',
          posession: 'any'
        }
      }
    },
    {
      hash: 'exception',
      layout: 'workspace',
      meta: {
        label: 'attexception',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'HRAttException',
          posession: 'any'
        }
      }
    },
    {
      hash: 'shift',
      layout: 'workspace',
      meta: {
        label: 'attshift',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'HRAttShift',
          posession: 'any'
        }
      }
    },
    {
      hash: 'schedule',
      layout: 'workspace',
      meta: {
        label: 'attschedule',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'HRAttSchedule',
          posession: 'any'
        }
      }
    },
    {
      hash: 'report',
      layout: 'workspace',
      meta: {
        label: 'attreport',
        requireAuthentication: true
      }
    }
  ]
}
