import { $axios } from 'src/plugins/axios'
import { CORE_LOGIN, CORE_LOGOUT } from 'assets/apiRoutes'
/*
export const someAction = (state) => {
}
*/

export function login ({ commit }, { username, password }) {
  $axios.post(CORE_LOGIN, { username, password })
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
  $axios.delete(CORE_LOGOUT)
    .then(response => {
      commit('logout')
      // $router.push('/')
    })
    .catch((error) => {
      console.log(error)
      // $router.push('/')
    })
}
