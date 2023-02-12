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
		let res = await axios.get(restUrl + `&start=${start}&filter[>CREATED_DATE]=2023-01-10&filter[<CREATED_DATE]=2023-01-20`)
		if (!iterations) {
			iterations = Math.ceil(res.data.total / limit)
		}
		start += limit
		iterations--
		totalTickets.push(...res.data?.result?.tasks)
	} while (iterations > 0)
	return totalTickets
}

const getAllGroupsAndMembers = async (fromDate, toDate) => {
	const allTasks = await getAllTasksWithFilters(fromDate, toDate)
	let groups = [] //tem os usuários dentro dele
	allTasks.forEach((task) => {
		//Grupo (projeto)
		let groupFoundIndex = groups.findIndex((g) => g.id === task.group.id)
		let groupIndex = groupFoundIndex
		if (groupFoundIndex === -1) {
			groups.push({ ...task.group, members: [] })
			groupIndex = groups.length - 1
		}
		//Usuários dentro do grupo
		let taskUsers = task.auditors.map((ta) => task.auditorsData[ta])
		// responsible e creator adicionando se não existir, mas acho difícil, retirar após validar se for o caso
		let additionalUsers = [task.creator, task.responsible].filter((mu) => !taskUsers.find((tu) => tu.id === mu.id))
		let taskUsersFormatted = [...taskUsers, ...additionalUsers].filter((a) => !groups[groupIndex].members.find((member) => member.id === a.id))
		if (taskUsers.length > 0) {
			groups[groupIndex].members.push(...taskUsersFormatted)
		}
	})

	return { groups }
}

const getOverviewMetrics = async (fromDate, toDate, usersFilter, groupsFilter, openTasksFilter, closedTasksFilter) => {
	const allTasks = await getAllTasksWithFilters(null, null)
	let totalTasks = allTasks.length
	let groups = [] //tem os usuários dentro dele
	let openTasks = 0
	let closedTasks = 0
	allTasks.forEach((task) => {
		//Métricas das tarefas
		if (task.closedDate) {
			closedTasks += 1
		} else {
			openTasks += 1
		}
		//Grupo (projeto)
		let groupFoundIndex = groups.findIndex((g) => g.id === task.group.id)
		let groupIndex = groupFoundIndex
		if (groupFoundIndex === -1) {
			groups.push({ ...task.group, members: [] })
			groupIndex = groups.length - 1
		}
		//Usuários dentro do grupo
		let taskUsers = task.auditors.map((ta) => task.auditorsData[ta])
		// responsible e creator adicionando se não existir, mas acho difícil, retirar após validar se for o caso
		let additionalUsers = [task.creator, task.responsible].filter((mu) => !taskUsers.find((tu) => tu.id === mu.id))
		let taskUsersFormatted = [...taskUsers, ...additionalUsers].filter((a) => !groups[groupIndex].members.find((member) => member.id === a.id))
		if (taskUsers.length > 0) {
			groups[groupIndex].members.push(...taskUsersFormatted)
		}
	})
	return { totalTasks, openTasks, closedTasks }
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

module.exports = {
	getAllGroupsAndMembers,
	getTotalPerMonth,
	getOverviewMetrics
}
