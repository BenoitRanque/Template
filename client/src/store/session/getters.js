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
