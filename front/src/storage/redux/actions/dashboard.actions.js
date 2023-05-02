const DASHBOARD_ACTION_TYPES = {
	ADD_ON_FILTERS: 'ADD_ON_FILTERS',
	RESET_FILTERS: 'RESET_FILTERS'
}

const addOnFiltersAction = (newFilters) => ({
	type: DASHBOARD_ACTION_TYPES.ADD_ON_FILTERS,
	payload: { newFilters }
})

export { DASHBOARD_ACTION_TYPES, addOnFiltersAction }
