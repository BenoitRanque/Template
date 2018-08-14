import axios from 'axios'

const $axios = axios.create({
  // baseURL: 'http://localhost:80',
  // baseURL: '',
  timeout: 5000,
  withCredentials: true
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
