import { $axios } from 'src/plugins/axios'
import {
  HR_ATT_TIMETYPE,
  HR_EMPLOYEE,
  HR_ATT_SCHEDULE
} from 'assets/apiRoutes'

export async function fetchTimetypes ({ commit, dispatch }, payload) {
  const { data } = await $axios.get(HR_ATT_TIMETYPE)

  commit('timetypes', data)
}

export async function fetchSubordinateEmployees ({ commit, dispatch }, payload) {
  const { data } = await $axios.get(HR_EMPLOYEE, { params: { subordinate: true } })

  commit('subordinateEmployees', data)
}

export async function fetchStandardSchedules ({ commit, dispatch }, payload) {
  const { data } = await $axios.get(HR_ATT_SCHEDULE, { params: { standard: true } })

  commit('standardSchedules', data)
}
