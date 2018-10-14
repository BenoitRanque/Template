/*
export function someGetter (state) {
}
*/

// categories that count towards standard time, ie not extra time
const CATEGORY_IS_STANDARD_TIME = [
  'SCH_TIME_WORK',
  'SCH_TIME_MATERNAL',
  'SCH_TIME_LEAVE'
]
// categories during which rest is possible
const CATEGORY_CAN_REST = [
  'SCH_TIME_WORK',
  'SCH_TIME_EXTRA'
]
// categories during which start/end events are possible
const CATEGORY_CAN_EVENT = [
  'SCH_TIME_WORK',
  'SCH_TIME_EXTRA',
  'SCH_REST_LUNCH'
]

export function categoryCanRest (state) {
  return categoryName => CATEGORY_CAN_REST.includes(categoryName)
}

export function categoryCanEvent (state) {
  return categoryName => CATEGORY_CAN_EVENT.includes(categoryName)
}

export function categoryIsStandardTime (state) {
  return categoryName => CATEGORY_IS_STANDARD_TIME.includes(categoryName)
}

export function timelineCategoryOptions (state) {
  return state.categories
    .filter(category => category.name.match(/^SCH_TIME/))
    .map(({ name, description }) => ({ value: name, label: description }))
}

export function restlineCategoryOptions (state) {
  return state.categories
    .filter(category => category.name.match(/^SCH_REST/))
    .map(({ name, description }) => ({ value: name, label: description }))
}

export function offlineCategoryOptions (state) {
  return state.categories
    .filter(category => category.name.match(/^SCH_DAY/))
    .map(({ name, description }) => ({ value: name, label: description }))
}

export function categoryDescription (state) {
  return categoryName => {
    const category = state.categories.find(category => category.name === categoryName)
    if (!category) throw new Error(`Unknow category name: ${categoryName}`)
    return category.description
  }
}

export function categoryBackgroundColor (state) {
  return categoryName => {
    const category = state.categories.find(category => category.name === categoryName)
    if (!category) throw new Error(`Unknow category name: ${categoryName}`)
    return category.backgroundColor
  }
}

export function categoryForegroundColor (state) {
  return categoryName => {
    const category = state.categories.find(category => category.name === categoryName)
    if (!category) throw new Error(`Unknow category name: ${categoryName}`)
    return category.foregroundColor
  }
}

export function formatTime () {
  return minutes => `0${Math.floor(minutes / 60)}:0${Math.floor(minutes % 60)}`.replace(/0(\d\d)/g, '$1')
}

export function parseTime () {
  return time => {
    const [ , hours, minutes ] = time.match(/(\d?\d)?:?([0-5]\d)/)
    return hours ? (Number(hours) * 60) + Number(minutes) : Number(minutes)
  }
}
