import lodash from 'lodash'
import moment from 'moment-timezone'

const formatToSeries = (formattedData, labels, orderBy) => {
	if (orderBy) {
		formattedData = lodash.orderBy(formattedData, 'value', orderBy)
	}
	const seriesDataObject = {
		series: formattedData.map((it) => ({ name: it?.key?.name, data: [it?.value] })),
		labels
	}
	return seriesDataObject
}

const buildOverviewMetrics = (allTasks) => {
	let totalTasks = allTasks.length
	let openTasks = 0
	let closedTasks = 0
	//pessoas
	let auditors = []
	let creators = []
	let responsibles = []
	let closers = []
	let accomplices = []
	let tags = []
	let averageCompletionTime = []
	allTasks.forEach((task) => {
		//Métricas das tarefas
		if (task.closedDate) {
			closedTasks += 1
		} else {
			openTasks += 1
		}
		//Usuários dentro do grupo
		const taskAuditors = task.auditors.filter((ta) => ta.id)
		const taskAccomplices = task.accomplices.filter((tac) => tac.id)
		const taskCreator = task.creator
		const taskResponsible = task.responsible
		const taskCloser = task.closer
		auditors = auditors.concat(taskAuditors)
		accomplices = accomplices.concat(taskAccomplices)
		if (taskCreator.id) {
			creators = taskCreator && creators.concat(taskCreator)
		}
		if (taskResponsible.id) {
			responsibles = taskResponsible && responsibles.concat(taskResponsible)
		}
		if (taskCloser.id) {
			closers = taskCloser && closers.concat(taskCloser)
		}
		//extrair tags
		task.tags.forEach((tt) => {
			const foundIndex = tags.findIndex((t) => t.key.id === tt.id)
			if (foundIndex === -1) {
				tags.push({ key: { id: tt.id, name: tt.title }, value: 1 })
			} else {
				tags[foundIndex].value += 1
			}
		})
		if (task.createdDate && task.closedDate) {
			const created = moment(task.createdDate)
			const closed = moment(task.closedDate)
			//tempo até fechar
			averageCompletionTime.push({
				// taskId: task.id,
				responsibleId: task.responsible.id,
				responsibleName: task.responsible.name,
				// completionTime: moment(closed).diff(created),
				completionTimeHours: moment(closed).diff(created, 'hours', true)
				// createdDate: task.createdDate,
				// closedDate: task.closedDate
			})
		}
	})

	const users = lodash.uniqBy([...auditors, ...creators, ...responsibles, ...closers, ...accomplices], 'id')
	const auditorsFormatted = Object.entries(lodash.countBy(auditors, 'id'))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: users.find((user) => user.id === obj.key) }))
	const creatorsFormatted = Object.entries(lodash.countBy(creators, 'id'))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: users.find((user) => user.id === obj.key) }))
	const responsiblesFormatted = Object.entries(lodash.countBy(responsibles, 'id'))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: users.find((user) => user.id === obj.key) }))
	const closersFormatted = Object.entries(lodash.countBy(closers, 'id'))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: users.find((user) => user.id === obj.key) }))
	const accomplicesFormatted = Object.entries(lodash.countBy(accomplices, 'id'))
		.map(([key, value]) => ({ key, value }))
		.map((obj) => ({ ...obj, key: users.find((user) => user.id === obj.key) }))

	const groupedAvg = lodash.groupBy(averageCompletionTime, 'responsibleId')
	const avgMemberTime = lodash.map(groupedAvg, (g) => ({
		key: {
			id: g[0].responsibleId,
			name: g[0].responsibleName
		},
		value: Math.round((lodash.sumBy(g, 'completionTimeHours') / g.length) * 10) / 10
	}))

	const finalData = {
		general: { totalTasks, openTasks, closedTasks },
		usersGraphData: {
			auditors: formatToSeries(auditorsFormatted, ['Observadores'], 'desc'),
			creators: formatToSeries(creatorsFormatted, ['Criadores'], 'desc'),
			responsibles: formatToSeries(responsiblesFormatted, ['Responsáveis'], 'desc'),
			closers: formatToSeries(closersFormatted, ['Fechadores'], 'desc'),
			accomplices: formatToSeries(accomplicesFormatted, ['Participantes'], 'desc')
		},
		tagsGraphData: {
			popular: formatToSeries(tags, ['Tags'], 'desc')
		},
		completionGraphData: {
			averageTime: formatToSeries(avgMemberTime, ['Média de finalização (em horas)'], 'desc')
		}
	}

	return finalData
}

export { buildOverviewMetrics }
