import axios from 'axios'
import { logoutAction } from 'storage/redux/actions/user.actions'
import { store } from 'storage/redux/store'
import { getLoggedUserToken, clearLocalStorage } from 'storage/local-storage/store'

const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({ baseURL: `${baseURL}/api` })

api.interceptors.request.use(async (config) => {
	if (getLoggedUserToken()) {
		config.headers.Authorization = `Bearer ${getLoggedUserToken()}`
	}

	return config
})

api.interceptors.response.use(
	(response) => {
		if ([401, 403].includes(response.status)) {
			store.dispatch(logoutAction())
			clearLocalStorage()
		}
		return response
	},
	(error) => {
		if (error.response && [401, 403].includes(error.response.status)) {
			store.dispatch(logoutAction())
			clearLocalStorage()
		}
		return Promise.reject(error)
	}
)

export default api
