const axios = require('axios')
const moment = require('moment-timezone')
const lodash = require('lodash')
const BitrixIntegration = require('../integration/bitrix.integration')
const UserService = require('./user.service')
const { formatSimpleUser, formatToSeries, formatToFilters, formatMembersToFilters } = require('../utils/utils')

// 1-pegar todas as pessoas do sistema
// 2-separar elas pelos projetos
// 3-colocar as tarefas de cada pessoa
// projeto > pessoa > tarefa

const getAllTasksWithFilters = async (fromDate, toDate, groupsFilter, membersFilter, taskStatusFilter) => {
	const restUrl = BitrixIntegration.getRestUrlTask()
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

const getAllGroupsAndMembers = async (fromDate, toDate) => {
	const allTasks = await getAllTasksWithFilters(fromDate, toDate)

	let groups = [] //tem os usuários dentro dele
	allTasks.forEach((task) => {
		//Grupo (projeto)
		const groupFoundIndex = groups.findIndex((g) => g.id === task.group.id)
		let groupIndex = groupFoundIndex
		if (groupFoundIndex === -1) {
			groups.push({ ...task.group, members: [] })
			groupIndex = groups.length - 1
		}
		//Usuários dentro do grupo
		const taskAuditors = task.auditors.map((it) => ({ id: it, auditor: 1 }))
		const taskCreator = { id: task.createdBy, creator: 1 }
		const taskResponsible = { id: task.responsibleId, responsible: 1 }
		const taskClosedBy = { id: task.createdBy, closer: 1 }
		const taskAccomplices = task.accomplices.map((it) => ({ id: it, accomplice: 1 }))
		const allTaskUsers = [...taskAuditors, taskCreator, taskResponsible, taskClosedBy, ...taskAccomplices]
		let formattedAllTaskUsers = []
		allTaskUsers.forEach((atu) => {
			const foundIndex = formattedAllTaskUsers.findIndex((fatu) => fatu.id === atu.id)
			if (foundIndex === -1) {
				formattedAllTaskUsers.push({ auditor: 0, creator: 0, responsible: 0, closer: 0, accomplice: 0, ...atu })
			} else {
				atu.auditor && (formattedAllTaskUsers[foundIndex].auditor = atu.auditor)
				atu.creator && (formattedAllTaskUsers[foundIndex].creator = atu.creator)
				atu.responsible && (formattedAllTaskUsers[foundIndex].responsible = atu.responsible)
				atu.closer && (formattedAllTaskUsers[foundIndex].closer = atu.closer)
				atu.accomplice && (formattedAllTaskUsers[foundIndex].accomplice = atu.accomplice)
			}
		})
		formattedAllTaskUsers.forEach((ftuser) => {
			const memberIndexFound = groups[groupIndex].members.findIndex((member) => member.id === ftuser.id)
			if (memberIndexFound === -1) {
				groups[groupIndex].members.push(ftuser)
			} else {
				groups[groupIndex].members[memberIndexFound].auditor += ftuser.auditor
				groups[groupIndex].members[memberIndexFound].creator += ftuser.creator
				groups[groupIndex].members[memberIndexFound].responsible += ftuser.responsible
				groups[groupIndex].members[memberIndexFound].closer += ftuser.closer
				groups[groupIndex].members[memberIndexFound].accomplice += ftuser.accomplice
			}
		})
	})

	for (let group of groups) {
		const users = await UserService.getAllUsers(group.members.map((it) => it.id))
		group.members = group.members.map((gm) => ({ ...gm, ...formatSimpleUser(users.find((u) => u.ID === gm.id)) }))
	}
	return groups
}

const getOverviewMetrics = async (fromDateFilter, toDateFilter, groupsFilter, membersFilter, taskStatusFilter) => {
	const allTasks = await getAllTasksWithFilters(fromDateFilter, toDateFilter, groupsFilter, membersFilter, taskStatusFilter)
	let totalTasks = allTasks.length
	let groups = [] //tem os usuários dentro dele
	let openTasks = 0
	let closedTasks = 0
	//people
	let auditors = []
	let creators = []
	let responsibles = []
	let closers = []
	let accomplices = []
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
		const taskAuditors = task.auditors
		const taskCreator = task.createdBy
		const taskResponsible = task.responsibleId
		const taskClosedBy = task.closedBy
		const taskAccomplices = task.accomplices
		auditors = auditors.concat(taskAuditors)
		creators = creators.concat(taskCreator)
		responsibles = responsibles.concat(taskResponsible)
		closers = closers.concat(taskClosedBy)
		accomplices = accomplices.concat(taskAccomplices)
		const allTaskUsers = lodash.uniq([...taskAuditors, taskCreator, taskResponsible, taskClosedBy, ...taskAccomplices])
		const taskUsersFormatted = allTaskUsers.filter((taskUserId) => !groups[groupIndex].members.find((memberId) => memberId === taskUserId))
		if (taskUsersFormatted.length > 0) {
			groups[groupIndex].members.push(...taskUsersFormatted)
		}
	})

	const uniqueIds = lodash.uniq([...auditors, ...creators, ...responsibles, ...closers, ...accomplices])
	const users = await UserService.getAllUsers(uniqueIds)

	const auditorsFormatted = Object.entries(lodash.countBy(auditors))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	const creatorsFormatted = Object.entries(lodash.countBy(creators))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	const responsiblesFormatted = Object.entries(lodash.countBy(responsibles))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	const closersFormatted = Object.entries(lodash.countBy(closers))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	const accomplicesFormatted = Object.entries(lodash.countBy(accomplices))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))

	const finalData = {
		general: { totalTasks, openTasks, closedTasks },
		usersGraphData: {
			auditors: formatToSeries(auditorsFormatted, ['Auditores'], 'desc'),
			creators: formatToSeries(creatorsFormatted, ['Criadores'], 'desc'),
			responsibles: formatToSeries(responsiblesFormatted, ['Responsáveis'], 'desc'),
			closers: formatToSeries(closersFormatted, ['Fechadores'], 'desc'),
			accomplices: formatToSeries(accomplicesFormatted, ['Cúmplices'], 'desc')
		}
	}

	return finalData
}

const getTotalPerMonth = async () => {
	const restUrl = BitrixIntegration.getRestUrlTask()
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

// const getGroups = async (fromDate, toDate, membersIds) => {
// 	const allTasks = await getAllTasksWithFilters(fromDate, toDate)
// 	let groups = [] //tem os usuários dentro dele

// 	allTasks.forEach((task) => {
// 		//Grupo (projeto)
// 		let groupFound = groups.find((g) => g.id === task.group.id)
// 		if (!groupFound) {
// 			//Usuários dentro do grupo
// 			if (membersIds) {
// 			}
// 			let taskUsers = task.auditors.map((ta) => task.auditorsData[ta])
// 			let additionalUsers = [task.creator, task.responsible].filter((mu) => !taskUsers.find((tu) => tu.id === mu.id))
// 			if (!groupFound) {
// 				groups.push(task.group)
// 			}
// 		}
// 	})

// 	return { groups }
// }

// const getMembers = async () => {
// 	const restUrl = BitrixIntegration.getRestUrlTask()
// 	return axios
// 		.get(restUrl)
// 		.then((res) => {
// 			const taskMonths = res.data?.result?.tasks.map((it) => moment(it.createdDate, 'YYYY-MM-DD HH:mm:ss ZZ').format('YYYY-MM'))
// 			const groupedTaskMonths = lodash.groupBy(taskMonths)
// 			const formattedTaskMonths = Object.keys(groupedTaskMonths).map((key) => ({ date: key, value: groupedTaskMonths[key].length }))
// 			const total = formattedTaskMonths.map((it) => it.value).reduce((a, b) => a + b)
// 			return { tasksPerMonth: formattedTaskMonths, total }
// 		})
// 		.catch((e) => console.error(e))
// }

module.exports = {
	getAllGroupsAndMembers,
	getTotalPerMonth,
	getOverviewMetrics
	// getGroups,
	// getMembers
}
