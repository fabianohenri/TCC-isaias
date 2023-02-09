import { setLoggedUser, getLoggedUser, clearLocalStorage } from 'storage/local-storage/store'

const USER_ACTION_TYPES = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	RESTORE_LOGGED_USER: 'RESTORE_LOGGED_USER',
	UPDATE_USER_DATA: 'UPDATE_USER_DATA'
}

//pode ser usado tanto no login quanto ao atualizar algum dado do usuário dentro do sistema
const loginAction = (user) => {
	setLoggedUser(user) //salva no local storage
	return { type: USER_ACTION_TYPES.LOGIN, payload: { user } }
}

const logoutAction = () => {
	clearLocalStorage()
	return {
		type: USER_ACTION_TYPES.LOGOUT
	}
}

const restoreLoggedUserAction = () => {
	const user = getLoggedUser()
	return { type: USER_ACTION_TYPES.RESTORE_LOGGED_USER, payload: { user } }
}

const updateUserDataAction = (updatedUserData) => ({
	type: USER_ACTION_TYPES.UPDATE_USER_DATA,
	payload: { updatedUserData }
})

export { USER_ACTION_TYPES, loginAction, logoutAction, restoreLoggedUserAction, updateUserDataAction }
