import { USER_ACTION_TYPES } from '../actions/user.actions'
import { DASHBOARD_ACTION_TYPES } from '../actions/dashboard.actions'
import moment from 'moment-timezone'

const DEFAULT_DASHBOARD_FILTERS = {
	fromDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
	toDate: moment().format('YYYY-MM-DD'),
	members: [],
	groups: []
}

const initialState = {
	dashboard: {
		filters: DEFAULT_DASHBOARD_FILTERS
	},
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
		case DASHBOARD_ACTION_TYPES.CHANGE_FILTERS:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					filters: action.payload.newFilters
				}
			}
		case DASHBOARD_ACTION_TYPES.resetFiltersAction:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					filters: DEFAULT_DASHBOARD_FILTERS
				}
			}
		default:
			return state
	}
}

export { DEFAULT_DASHBOARD_FILTERS }
