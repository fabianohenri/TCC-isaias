const lodash = require('lodash')

const extractGlobalFiltersFromRequest = (request) => {
	const fromDate = !request.query.fromDate || request.query.fromDate === '' || request.query.fromDate === 'null' ? null : request.query.fromDate
	const toDate = !request.query.toDate || request.query.toDate === '' || request.query.toDate === 'null' ? null : request.query.toDate
	const members =
		!request.query.members || request.query.members === '' || request.query.members === 'null' ? null : request.query.members.split(',')
	const groups = !request.query.groups || request.query.groups === '' || request.query.groups === 'null' ? null : request.query.groups.split(',')
	const taskStatus =
		!request.query.taskStatus || request.query.taskStatus === '' || request.query.taskStatus === 'null' ? null : request.query.taskStatus
	return {
		fromDate,
		toDate,
		members,
		groups,
		taskStatus
	}
}

const formatSimpleUser = (user) => {
	let formattedUser = { id: null, name: 'Usuário indefinido' }
	if (user) {
		formattedUser = { id: user?.ID || 'Usuário indefinido', name: user?.NAME + ' ' + user?.LAST_NAME }
	}
	return formattedUser
}

const formatToSeries = (formattedData, labels, orderBy) => {
	if (orderBy === 'desc') {
		formattedData = lodash.orderBy(formattedData, 'value', 'desc')
	}
	return { series: formattedData.map((it) => ({ name: it.key.name, data: [it.value] })), labels }
}

const formatToFilters = (filtersArray, filterName) => {
	let queryString = ''
	if (filtersArray) {
		queryString = filtersArray
			.map((filter) => `&filter[${filterName}][]=${filter}`)
			.join()
			.replaceAll(',', '')
	} else {
		queryString = ''
	}
	return queryString
}

module.exports = {
	extractGlobalFiltersFromRequest,
	formatSimpleUser,
	formatToSeries,
	formatToFilters
}
