/*
export const someMutation = (state, payload) => {
}
*/
export function login (state, { user, privileges }) {
  state.session.user = user || {}
  state.session.privileges = privileges || []
  state.session.active = true
}

export function logout (state) {
  state.session.user = null
  state.session.privileges = null
  state.session.active = false
}

export function idleTimerOn (state, timer) {
  state.idleTimer && state.idleTimer.timerOff()
  state.idleTimer = timer
}

export function pingTimerOn (state, timer) {
  state.pingTimer && state.pingTimer.timerOff()
  state.pingTimer = timer
}

export function idleTimerOff (state, timer) {
  state.idleTimer && state.idleTimer.timerOff()
}

export function pingTimerOff (state, timer) {
  state.pingTimer && state.pingTimer.timerOff()
}
