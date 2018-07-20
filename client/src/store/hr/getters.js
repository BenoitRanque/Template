import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK } = ATT
/*
export const someGetter = (state) => {
}
*/

export function breakTimetypesOptions (state) {
  return [
    {
      value: ATT_BREAK,
      label: 'Tiempo Almuerzo'
    }
  ]
}
export function uptimeTimetypesOptions (state) {
  return [
    {
      value: ATT_WORK,
      label: 'Tiempo laboral'
    }
  ]
}
export function downtimeTimetypesOptions (state) {
  return [
    {
      value: ATT_TIMEOFF,
      label: 'Tiempo libre'
    }
  ]
}
