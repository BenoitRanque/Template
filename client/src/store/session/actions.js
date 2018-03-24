/*
export const someAction = (state) => {
}
*/

export function login ({ commit }, { username, password }) {
  this._vm.$axios.post('/api/core/session/login', { username, password })
    .then(response => {
      // console.log(response)
      commit('login', { user: response.data.user })
    })
    .catch(error => {
      console.log(error)
      // $router.push('/')
    })
}

export function logout ({ commit }) {
  this._vm.$axios.get('/api/core/session/logout')
    .then(response => {
      commit('logout')
      // $router.push('/')
    })
    .catch(() => {
      // $router.push('/')
    })
}
