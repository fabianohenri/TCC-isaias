import axios from 'axios'
// import { logoutAction } from '../store/redux/actions/user.actions'
// import { store } from 'store/redux/store'
// import { getLoggedUserToken, clearLocalStorage } from 'store/local-storage/store'

const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({ baseURL: `${baseURL}/api` })

// api.interceptors.request.use(async (config) => {
// 	if (getLoggedUserToken()) {
// 		config.headers.Authorization = `Bearer ${getLoggedUserToken()}`
// 	}

// 	return config
// })

// api.interceptors.response.use(
// 	(response) => {
// 		if (response.status === 403) {
// 			store.dispatch(logoutAction())
// 			clearLocalStorage()
// 		}
// 		return response
// 	},
// 	(error) => {
// 		if (error.response && error.response.status === 403) {
// 			store.dispatch(logoutAction())
// 			clearLocalStorage()
// 		}
// 		return Promise.reject(error)
// 	}
// )

export default api
