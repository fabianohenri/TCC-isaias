const axios = require('axios')
const moment = require('moment-timezone')
const lodash = require('lodash')
const BitrixIntegration = require('../integration/bitrix.integration')

// 1-pegar todas as pessoas do sistema
// 2-separar elas pelos projetos
// 3-colocar as tarefas de cada pessoa
// projeto > pessoa > tarefa

const getAllTasksWithFilters = async (fromDate, toDate) => {
	const restUrl = BitrixIntegration.getRestUrl()
	let totalTickets = []

	// https://projetusti.bitrix24.com.br/rest/tasks.task.list.json?&filter[>CREATED_DATE]=2023-01-15&filter[<CREATED_DATE]=2023-01-20

	const limit = 50
	let start = 0
	let iterations = null

	do {
		let res = await axios.get(restUrl + `&start=${start}`)
		if (!iterations) {
			iterations = Math.ceil(res.data.total / limit)
		}
		start += limit
		iterations--
		totalTickets.push(...res.data?.result?.tasks)
	} while (iterations > 0)
}

const getOverviewMetrics = async () => {
	getAllTasksWithFilters(null, null)
	return {}
}

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

const getSomeMetric = async () => {
	let taskCreators = []
	// let taskClosers = []
	let taskCreatorsFormatted = []
	let taskResponsibles = []
	let taskGroups = []
	let totalComments = 0

	totalTickets.forEach((it) => {
		let creatorIndex = null
		const creatorFound = taskCreators.find((item, index) => {
			if (it.creator.id === item.user.id) {
				creatorIndex = index
				return true
			}
		})

		if (!creatorFound) {
			taskCreators.push({ user: it.creator, dates: [it.createdDate] })
		} else {
			taskCreators[creatorIndex].dates.push(it.createdDate)
		}

		// let closerIndex = null
		// const closerFound = taskClosers.find((item, index) => {
		// 	if (it.closedBy === item.user.id) {
		// 		closerIndex = index
		// 		return true
		// 	}
		// })

		// if (!closerFound) {
		// 	taskClosers.push({ user: { id: it.closedBy }, dates: [it.closedDate] })
		// } else {
		// 	taskClosers[closerIndex].dates.push(it.closedDate)
		// }

		let responsibleIndex = null
		const responsibleFound = taskResponsibles.find((item, index) => {
			if (it.responsible.id === item.user.id) {
				responsibleIndex = index
				return true
			}
		})

		if (!responsibleFound) {
			taskResponsibles.push({ user: it.responsible, tasksIds: [it.id] })
		} else {
			taskResponsibles[responsibleIndex].tasksIds.push(it.id)
		}

		let groupIndex = null
		const groupFound = taskGroups.find((item, index) => {
			if (it.group.id === item.group.id) {
				groupIndex = index
				return true
			}
		})

		if (!groupFound) {
			taskGroups.push({ group: it.group, tasksIds: [it.id] })
		} else {
			taskGroups[groupIndex].tasksIds.push(it.id)
		}

		totalComments += Number(it.commentsCount)
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
}

module.exports = {
	getTotalPerMonth,
	getOverviewMetrics
}
