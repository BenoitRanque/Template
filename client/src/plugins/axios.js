import axios from 'axios'

const $axios = axios.create({
  // baseURL: 'http://localhost:80',
  // baseURL: '',
  timeout: 1000,
  withCredentials: true
  // headers: {
  //   'header': 'value'
  // }
})

// // Add a request interceptor
// $axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// // Add a response interceptor
// $axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response
// }, function (error) {
//   // Do something with response error
//   console.log(error)
//   return Promise.reject(error)
// })

export default ({ Vue }) => {
  Vue.prototype.$axios = $axios
}

export {
  $axios
}
