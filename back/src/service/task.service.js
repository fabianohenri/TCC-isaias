const axios = require('axios')
const moment = require('moment-timezone')
const lodash = require('lodash')
const BitrixIntegration = require('../integration/bitrix.integration')

// 1-pegar todas as pessoas do sistema
// 2-separar elas pelos projetos
// 3-colocar as tarefas de cada pessoa
// projeto > pessoa > tarefa

const getTotalPerMonth = async () => {
	const restUrl = BitrixIntegration.getRestUrl()
	return axios
		.get(restUrl)
		.then((res) => {
			const taskMonths = res.data?.result?.tasks.map((it) => moment(it.createdDate, 'YYYY-MM-DD HH:mm:ss ZZ').format('YYYY-MM'))
			const groupedTaskMonths = lodash.groupBy(taskMonths)
			const formattedTaskMonths = Object.keys(groupedTaskMonths).map((key) => ({ date: key, value: groupedTaskMonths[key].length }))
			const total = formattedTaskMonths.map((it) => it.value).reduce((a, b) => a + b)
			return { tasksPerMonth: formattedTaskMonths, total }
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

			let taskCreators = []
			let taskCreatorsFormatted = []
			let taskResponsibles = []
			let taskGroups = []
			let totalComments = 0
			let closedDates = []

			totalTickets.forEach((it) => {
				taskCreators.push({ creator: it.creator, createdDate: moment(it.createdDate, 'YYYY-MM-DD HH:mm:ss ZZ').format('YYYY-MM') })
				taskResponsibles.push(it.responsible)
				taskGroups.push(it.group)
				totalComments += Number(it.commentsCount)
				closedDates.push({ date: it.closedDate, closedById: it.closedBy })
			})

			taskCreators.forEach((it) => {
				let indexToChange = taskCreatorsFormatted.findIndex((tc) => Number(tc.creatorId) === Number(it.creator.id))
				if (indexToChange >= 0) {
					let index = taskCreatorsFormatted[indexToChange].createdTasks.findIndex((ct) => ct.date === it.createdDate)
					if (index >= 0) {
						taskCreatorsFormatted[indexToChange].createdTasks[index].value += 1
					} else {
						taskCreatorsFormatted[indexToChange].createdTasks.push({ date: it.createdDate, value: 1 })
					}
				} else {
					taskCreatorsFormatted.push({ creatorId: Number(it.creator.id), createdTasks: [{ date: it.createdDate, value: 1 }] })
				}
			})

			const groupedResponsibles = lodash.groupBy(taskResponsibles, (responsible) => responsible.id)
			const groupedGroups = lodash.groupBy(taskGroups, (group) => group.id)

			const formattedResponsibles = Object.keys(groupedResponsibles).map((key) => {
				let ticketsPerMonthOpened = taskCreatorsFormatted.find((tcf) => tcf.creatorId === key)
				return {
					user: groupedResponsibles[key][0],
					totalTickets: groupedResponsibles[key].length,
					ticketsPerMonthOpened,
					groupedCreators: 2,
					groupedGroups
				}
			})

			return formattedResponsibles
		})
		.catch((e) => console.error(e))
}

module.exports = {
	getTotalPerMonth,
	getTotalTicketsPerson
}
