const DASHBOARD_ACTION_TYPES = {
	ADD_ON_FILTERS: 'ADD_ON_FILTERS',
	RESET_FILTERS: 'RESET_FILTERS',
	CHANGE_MENU_ITEM: 'CHANGE_MENU_ITEM'
}

const addOnFiltersAction = (newFilters) => ({
	type: DASHBOARD_ACTION_TYPES.ADD_ON_FILTERS,
	payload: { newFilters }
})

const changeMenuItemAction = (selectedMenuItem) => ({
	type: DASHBOARD_ACTION_TYPES.CHANGE_MENU_ITEM,
	payload: { selectedMenuItem }
})

export { DASHBOARD_ACTION_TYPES, addOnFiltersAction, changeMenuItemAction }
