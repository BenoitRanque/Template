import { $axios } from 'src/plugins/axios'
import { CORE_LOGIN, CORE_LOGOUT } from 'assets/apiRoutes'
/*
export const someAction = (state) => {
}
*/

export function login ({ commit }, { username, password, success, failure }) {
  $axios.post(CORE_LOGIN, { username, password })
    .then(response => {
      if (success !== undefined) success()
      commit('login', { user: response.data.user, privileges: response.data.privileges })
    })
    .catch(() => {
      if (failure !== undefined) failure()
    })
}

export function logout ({ commit }, { success, failure }) {
  $axios.delete(CORE_LOGOUT)
    .then(() => {
      commit('logout')
      if (success !== undefined) success()
    })
    .catch(() => {
      commit('logout')
      if (failure !== undefined) failure()
    })
}
