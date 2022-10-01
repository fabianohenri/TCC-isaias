const axios = require('axios')
const moment = require('moment-timezone')
const lodash = require('lodash')
const BitrixIntegration = require('../integration/bitrix.integration')

const getTotalPerMonth = async () => {
	const restUrl = BitrixIntegration.getRestUrl()
	return axios
		.get(restUrl)
		.then((res) => {
			const taskMonths = res.data?.result?.tasks.map((it) => Number(moment(it.createdDate).format('MM')))
			const groupedTaskMonths = lodash.groupBy(taskMonths)
			const formattedTaskMonths = Object.keys(groupedTaskMonths).map((key) => ({ [Number(key)]: groupedTaskMonths[key].length }))
			return formattedTaskMonths
		})
		.catch((e) => console.error(e))
}

const getTotalTicketsPerson = async (status) => {
	const restUrl = BitrixIntegration.getRestUrl()
	return axios
		.get(restUrl)
		.then((res) => {
			let totalTickets = res.data?.result?.tasks
			if (status === 'CLOSED') {
				totalTickets = totalTickets.filter((it) => it.closedDate)
			} else if (status === 'OPENED') {
				totalTickets = totalTickets.filter((it) => !it.closedDate)
			}

			let taskResponsibles = totalTickets.map((it) => it.responsible)

			const groupedResponsibles = lodash.groupBy(taskResponsibles, (responsible) => responsible.id)
			const formattedResponsibles = Object.keys(groupedResponsibles).map((key) => ({
				user: groupedResponsibles[key][0],
				tickets: groupedResponsibles[key].length
			}))
			return formattedResponsibles
		})
		.catch((e) => console.error(e))
}

module.exports = {
	getTotalPerMonth,
	getTotalTicketsPerson
}
