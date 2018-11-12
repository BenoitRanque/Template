/*
export function someGetter (state) {
}
*/

export function isAuthenticated ({ user }) {
  return !!user
}

export function username ({ user }, { isAuthenticated }) {
  return isAuthenticated ? user.username : ''
}

export function isAuthorized ({ user }, { isAuthenticated }) {
  return roles => {
    return isAuthenticated && user && user.roles && roles && roles.length ? user.roles.some(role => roles.includes(role.name)) : false
  }
}
