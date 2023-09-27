const lodash = require('lodash')

const extractGlobalFiltersFromRequest = (request) => {
	const fromDate = !request.query.fromDate || request.query.fromDate === '' || request.query.fromDate === 'null' ? null : request.query.fromDate
	const toDate = !request.query.toDate || request.query.toDate === '' || request.query.toDate === 'null' ? null : request.query.toDate
	return {
		fromDate,
		toDate
	}
}

const formatSimpleUser = (user) => {
	let formattedUser = { id: null, name: 'Usuário indefinido' }
	if (user) {
		formattedUser = { id: user?.ID || null, name: user?.NAME + ' ' + user?.LAST_NAME }
	}
	return formattedUser
}

const getNameAndIdFromUser = (user) => {
	let formattedUser = { id: null, name: 'Usuário indefinido' }
	if (user) {
		formattedUser = { id: user?.id || null, name: user?.name }
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

const formatMemberChecked = (member) => {
	let memberString = ''

	if (member.accomplice.checked) {
		memberString += `&filter[ACCOMPLICE][]=${member.id}`
	}
	if (member.auditor.checked) {
		memberString += `&filter[AUDITOR][]=${member.id}`
	}
	if (member.creator.checked) {
		memberString += `&filter[CREATED_BY][]=${member.id}`
	}
	if (member.responsible.checked) {
		memberString += `&filter[RESPONSIBLE_ID][]=${member.id}`
	}

	return memberString
}

const formatMembersToFilters = (filtersArray) => {
	let queryString = ''
	if (filtersArray) {
		queryString = filtersArray
			.map((filter) => formatMemberChecked(filter))
			.join()
			.replaceAll(',', '')
	} else {
		queryString = ''
	}
	return queryString
}

const formatTask = (task) => ({
	id: task.id,
	allUsers: task.allUsers,
	closedDate: task.closedDate,
	createdDate: task.createdDate,
	dateStart: task.dateStart,
	deadline: task.deadline,
	description: task.description,
	durationFact: task.durationFact,
	durationPlan: task.durationPlan,
	durationType: task.durationType,
	endDatePlan: task.endDatePlan,
	group: task.group,
	priority: task.priority,
	serviceCommentsCount: task.serviceCommentsCount,
	status: task.status,
	timeEstimate: task.timeEstimate,
	title: task.title
})

module.exports = {
	extractGlobalFiltersFromRequest,
	formatSimpleUser,
	formatToSeries,
	formatToFilters,
	formatMembersToFilters,
	getNameAndIdFromUser,
	formatTask
}
