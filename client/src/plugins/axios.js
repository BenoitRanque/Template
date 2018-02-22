import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://localhost:80',
  withCredentials: true
  // timeout: 1000,
  // headers: {
  //   'header': 'value'
  // }
})

export default ({ Vue }) => {
  Vue.prototype.$axios = $axios
}

export {
  $axios
}
