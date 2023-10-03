import { USER_ACTION_TYPES } from '../actions/user.actions'
import { DASHBOARD_ACTION_TYPES } from '../actions/dashboard.actions'
import moment from 'moment-timezone'

const DEFAULT_DASHBOARD_FILTERS = {
	members: [],
	groups: [],
	tags: [],
	showOnlySelectedData: false
}
const DEFAULT_DASHBOARD_DATE_FILTERS = {
	fromDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
	toDate: moment().format('YYYY-MM-DD')
}

const initialState = {
	dashboard: {
		selectedMenuItem: 'overview',
		filters: { dependant: DEFAULT_DASHBOARD_FILTERS, ...DEFAULT_DASHBOARD_DATE_FILTERS }
	},
	user: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		//USER
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
		//DASHBOARD
		case DASHBOARD_ACTION_TYPES.ADD_ON_FILTERS:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					filters: { ...state.dashboard.filters, ...action.payload.newFilters }
				}
			}
		// case DASHBOARD_ACTION_TYPES.RESET_FILTERS:
		// 	return {
		// 		...state,
		// 		dashboard: {
		// 			...state.dashboard,
		// 			filters: DEFAULT_DASHBOARD_FILTERS
		// 		}
		// 	}
		case DASHBOARD_ACTION_TYPES.CHANGE_MENU_ITEM:
			return {
				...state,
				dashboard: {
					...state.dashboard,
					selectedMenuItem: action.payload.selectedMenuItem
				}
			}
		default:
			return state
	}
}

export { DEFAULT_DASHBOARD_FILTERS, DEFAULT_DASHBOARD_DATE_FILTERS }
