/*
export function someMutation (state) {
}
*/

export function login (state, { token, user }) {
  state.token = token
  state.user = user
}

export function logout (state) {
  state.token = null
  state.user = null
}
