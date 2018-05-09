/*
export const someGetter = (state) => {
}
*/

export function isAuthenticated ({ session }) {
  return !!session
}

export function isAuthorized ({ session }, { isAuthenticated }) {
  return (resource = [], action = ['read', 'create', 'update', 'delete'], possession = 'any') => {
    // example privilege structure
    // const privileges = {
    //   resource: {
    //     action: ['posession'],
    //   }
    // }
    const { privileges } = session

    const optionalArrayIteration = (values, method) => {
      return Array.isArray(values) ? values.some(method) : method(values)
    }

    return isAuthenticated() && optionalArrayIteration(resource, resource => {
      return privileges.hasOwnProperty(resource) && optionalArrayIteration(action, action => {
        return privileges[resource].hasOwnProperty(action) && optionalArrayIteration(possession, possession => {
          return privileges[resource][action].includes(possession)
        })
      })
    })
  }
}
