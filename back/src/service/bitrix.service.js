const axios = require('axios')
const BitrixIntegration = require('../integration/bitrix.integration')
const { formatToFilters, formatMembersToFilters } = require('../utils/utils')

const getAllTasksWithFilters = async (bitrixFullDomain, bitrixAccessToken, fromDate, toDate, groupsFilter, membersFilter, taskStatusFilter) => {
	const restUrl = BitrixIntegration.getRestUrlTask(bitrixFullDomain, bitrixAccessToken)
	let totalTickets = []
	// https://projetusti.bitrix24.com.br/rest/tasks.task.list.json&filter[>CREATED_DATE]=2023-01-10&filter[<CREATED_DATE]=2023-01-20
	const limit = 50
	let start = 0
	let iterations = null
	let queryStringFilterGroups = formatToFilters(groupsFilter, 'GROUP_ID')
	let queryStringFilterMembers = formatMembersToFilters(membersFilter)
	do {
		let res = await axios.get(
			restUrl +
				`&start=${start}&filter[>CREATED_DATE]=${fromDate}&filter[<CREATED_DATE]=${toDate}${queryStringFilterGroups}${queryStringFilterMembers}`
		)
		if (!iterations) {
			iterations = Math.ceil(res.data.total / limit)
		}
		start += limit
		iterations--
		totalTickets.push(...res.data?.result?.tasks)
	} while (iterations > 0)
	return totalTickets
}

const getTotalPerMonth = async (bitrixFullDomain, bitrixAccessToken) => {
	const restUrl = BitrixIntegration.getRestUrlTask(bitrixFullDomain, bitrixAccessToken)
	const res = await axios.get(restUrl)
	return res.data?.result?.tasks
}

const getBitrixUsersByIds = async (bitrixFullDomain, bitrixAccessToken, userIds) => {
	let formattedUserIdsParams = ''
	if (userIds) {
		formattedUserIdsParams = userIds
			.map((uId) => '&ID[]=' + uId)
			.toString()
			.replaceAll(',', '')
	}
	let bitrixUsers = await BitrixIntegration.getBitrixUsersByIds(bitrixFullDomain, bitrixAccessToken, formattedUserIdsParams)
	return bitrixUsers
}

module.exports = {
	getAllTasksWithFilters,
	getTotalPerMonth,
	getBitrixUsersByIds
}
