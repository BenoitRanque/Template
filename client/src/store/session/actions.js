import { $axios } from '../../plugins/axios'

/*
export const someAction = (state) => {
}
*/

export function login ({ commit }, { username, password }) {
  $axios.post('/api/session/login', { username, password })
    .then(response => {
      commit('login', { user: response.data.user })
    })
    .catch(() => {
      // $router.push('/')
    })
}

export function logout ({ commit }) {
  $axios.get('/api/session/logout')
    .then(response => {
      commit('logout')
      // $router.push('/')
    })
    .catch(() => {
      // $router.push('/')
    })
}
