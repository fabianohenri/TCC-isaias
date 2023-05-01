import lodash from 'lodash'

const formatToSeries = (formattedData, labels, orderBy) => {
	if (orderBy === 'desc') {
		formattedData = lodash.orderBy(formattedData, 'value', 'desc')
	}
	return { series: formattedData.map((it) => ({ name: it.key.name, data: [it.value] })), labels }
}

const buildOverviewMetrics = async (allTasks) => {
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
	// const users = await BitrixService.getBitrixUsersByIds(bitrixAccess, uniqueIds)

	// const auditorsFormatted = Object.entries(lodash.countBy(auditors))
	// 	.map(([key, value]) => ({ key, value }))
	// 	.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	// const creatorsFormatted = Object.entries(lodash.countBy(creators))
	// 	.map(([key, value]) => ({ key, value }))
	// 	.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	// const responsiblesFormatted = Object.entries(lodash.countBy(responsibles))
	// 	.map(([key, value]) => ({ key, value }))
	// 	.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	// const closersFormatted = Object.entries(lodash.countBy(closers))
	// 	.map(([key, value]) => ({ key, value }))
	// 	.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))
	// const accomplicesFormatted = Object.entries(lodash.countBy(accomplices))
	// 	.map(([key, value]) => ({ key, value }))
	// 	.map((obj) => ({ ...obj, key: formatSimpleUser(users.find((user) => user.ID === obj.key)) }))

	// const finalData = {
	// 	general: { totalTasks, openTasks, closedTasks },
	// 	usersGraphData: {
	// 		auditors: formatToSeries(auditorsFormatted, ['Auditores'], 'desc'),
	// 		creators: formatToSeries(creatorsFormatted, ['Criadores'], 'desc'),
	// 		responsibles: formatToSeries(responsiblesFormatted, ['Responsáveis'], 'desc'),
	// 		closers: formatToSeries(closersFormatted, ['Fechadores'], 'desc'),
	// 		accomplices: formatToSeries(accomplicesFormatted, ['Cúmplices'], 'desc')
	// 	}
	// }

	const finalData = {}

	return finalData
}

export { buildOverviewMetrics }
