import { USER_ACTION_TYPES } from '../actions/user.actions'

const initialState = {
	user: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_ACTION_TYPES.LOGIN:
			return {
				...state,
				user: action.payload.user
			}
		case USER_ACTION_TYPES.RESTORE_LOGGED_USER:
			return {
				...state,
				user: action.payload.user
			}
		case USER_ACTION_TYPES.LOGOUT:
			return {
				...state,
				user: initialState.user
			}
		default:
			return state
	}
}
