/*
export const someGetter = (state) => {
}
*/

export function authenticated (state) {
  return !!state.user
}
