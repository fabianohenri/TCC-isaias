const auth = 'tccauth'

export const setLoggedUser = (userData) => localStorage.setItem(auth, JSON.stringify(userData))
export const getLoggedUser = () => {
	try {
		return JSON.parse(localStorage.getItem(auth))
	} catch (e) {
		clearLocalStorage()
	}
}
export const getLoggedUserToken = () => (localStorage.getItem(auth) ? JSON.parse(localStorage.getItem(auth))?.token : null)
export const clearLocalStorage = () => localStorage.removeItem(auth)

//Unused
export const clearLoggedUser = () => localStorage.removeItem(auth)
