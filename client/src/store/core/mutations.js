/*
export const someMutation = (state, payload) => {
}
*/
export function login (state, { session }) {
  state.session = session
}

export function logout (state) {
  state.session = null
}
