const DASHBOARD_ACTION_TYPES = {
	CHANGE_FILTERS: 'CHANGE_FILTERS',
	RESET_FILTERS: 'RESET_FILTERS'
}

const changeFiltersAction = (newFilters) => ({
	type: DASHBOARD_ACTION_TYPES.CHANGE_FILTERS,
	payload: { newFilters }
})

export { DASHBOARD_ACTION_TYPES, changeFiltersAction }
