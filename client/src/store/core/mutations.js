/*
export const someMutation = (state, payload) => {
}
*/
export function login (state, { user, privileges }) {
  state.session = { user, privileges }
}

export function logout (state) {
  state.session = null
}
