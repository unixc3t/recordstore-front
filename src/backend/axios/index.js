import axios from 'axios'

const API_URL = 'http://localhost:3000'

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': window.localStorage.csrf
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (
    error.response &&
    error.response.config &&
    error.response.status === 401
  ) {
    return plainAxiosInstance
      .post(
        '/refresh',
        {},
        { headers: { 'X-CSRF-TOKEN': window.localStorage.csrf } }
      )
      .then(response => {
        window.localStorage.csrf = response.data.csrf
        window.localStorage.signedIn = true

        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = window.localStorage.csrf
        return plainAxiosInstance.request(retryConfig)
      })
      .catch(error => {
        delete window.localStorage.csrf
        delete window.localStorage.signedIn

        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }
