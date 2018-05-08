/*
export const someAction = (state) => {
}
*/

export function login ({ commit }, { username, password }) {
  this._vm.$axios.post('/api/core/login', { username, password })
    .then(response => {
      // console.log(response)
      console.log(response.data)
      commit('login', { user: response.data.user })
    })
    .catch(error => {
      console.log(error)
      // $router.push('/')
    })
}

export function logout ({ commit }) {
  this._vm.$axios.delete('/api/core/logout')
    .then(response => {
      commit('logout')
      // $router.push('/')
    })
    .catch((error) => {
      console.log(error)
      // $router.push('/')
    })
}
