import { $axios } from 'src/plugins/axios'
import {
  CORE_LOGIN,
  CORE_LOGOUT
  // CORE_PING
} from 'assets/apiRoutes'

// const IDLE_TIMEOUT = 1000 * 60 * 10
// const PING_TIMEOUT = 1000 * 60 * 5

// class IdleTimer {
//   constructor (timeout, timerExpired) {
//     this.timer = null
//     this.timeout = timeout
//     this.timerExpired = timerExpired

//     this.resetTimer()
//     this.timerOn()
//   }

//   timerOn () {
//     window.addEventListener('scroll', this.resetTimer, true)
//     window.addEventListener('mousemove', this.resetTimer, true)
//     window.addEventListener('mousedown', this.resetTimer, true)
//     window.addEventListener('keypress', this.resetTimer, true)
//   }

//   timerOff () {
//     window.removeEventListener('scroll', this.resetTimer, true)
//     window.removeEventListener('mousemove', this.resetTimer, true)
//     window.removeEventListener('mousedown', this.resetTimer, true)
//     window.removeEventListener('keypress', this.resetTimer, true)
//   }

//   resetTimer () {
//     console.log('reset idle')
//     clearTimeout(this.timer)
//     this.timer = setTimeout(this.timerExpired, this.timeout)
//   }
// }

// class PingTimer {
//   constructor (timeout) {
//     this.timeout = timeout
//     this.timerOn()
//   }

//   timerOn () {
//     this.timer = setTimeout(() => {
//       console.log('ping')
//       $axios.get(CORE_PING).then(this.timerOn.bind(this)).catch(() => {})
//     }, this.timeout)
//   }

//   timerOff () {
//     clearTimeout(this.timer)
//   }
// }

export function login ({ commit, dispatch }, { username, password, success, failure }) {
  $axios.post(CORE_LOGIN, { username, password })
    .then(response => {
      if (success !== undefined) success()
      commit('login', { user: response.data.user, privileges: response.data.privileges })
      // commit('idleTimerOn', new IdleTimer(IDLE_TIMEOUT, () => {}))
      // commit('idleTimerOn', new IdleTimer(IDLE_TIMEOUT, () => dispatch('sessionTimeout')))
      // commit('pingTimerOn', new PingTimer(PING_TIMEOUT))
    })
    .catch(() => {
      if (failure !== undefined) failure()
    })
}

export function logout ({ commit }, { success, failure }) {
  commit('idleTimerOff')
  commit('pingTimerOff')
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

export function sessionTimeout ({ dispatch }) {
  console.log('session timeout idle')
  dispatch('logout', {})
}
