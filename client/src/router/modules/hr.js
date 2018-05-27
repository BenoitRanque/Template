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
      hash: 'attendance',
      layout: 'workspace',
      meta: {
        label: 'attendance'
      }
    }
  ]
}
