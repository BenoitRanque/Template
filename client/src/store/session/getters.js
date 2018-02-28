/*
export const someGetter = (state) => {
}
*/

export function isAuthenticated ({ user }) {
  return !!user
}

export function isAuthorized ({ user }, { isAuthenticated }) {
  return (module, privNames) => {
    return isAuthenticated() && user.roles.some(role => {
      return role.module === module && role.privileges.some(privilege => {
        return privNames.includes(privilege.name)
      })
    })
  }
}
