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

function formatToSeries2(formattedData, orderBy) {
	let labels = new Set()
	// if (orderBy) {
	// 	formattedData = lodash.orderBy(formattedData, 'value', orderBy)
	// }
	const seriesDataObject = []

	formattedData.forEach((item) => {
		const name = item.key.name
		const createdDate = new Date(item.key.createdDate).getTime()
		const value = item.value

		let seriesEntry = seriesDataObject.findIndex((entry) => entry.name === name)
		labels.add(createdDate)
		if (seriesEntry != -1) {
			seriesDataObject[seriesEntry].data.push(value)
		} else {
			seriesDataObject.push({
				name: name,
				data: [value]
			})
		}
	})
	let labelsArray = Array.from(labels).map((label) => moment(label).format('MMM/YYYY'))
	console.log('seriesDataObject', labelsArray)
	return { series: seriesDataObject, labels: labelsArray }
}

const buildOverviewMetrics = (allTasks) => {
	let totalTasks = allTasks.length
	let openTasks = 0
	let closedTasks = 0
	let highPriority = 0
	let normalPriority = 0
	let hotfixTasks = 0
	allTasks.forEach((task) => {
		if (task.title.includes('[HOTFIX]')) {
			hotfixTasks += 1
		}
		if (task.priority === '1') {
			normalPriority += 1
		} else if (task.priority === '2') {
			highPriority += 1
		}
		if (task.closedDate) {
			closedTasks += 1
		} else {
			openTasks += 1
		}
	})

	const finalData = { totalTasks, openTasks, closedTasks, highPriority, normalPriority, hotfixTasks }

	return finalData
}

const buildGraphsMetrics = (allTasks) => {
	let auditors = []
	let creators = []
	let responsibles = []
	let closers = []
	let accomplices = []
	let tags = []
	let averageCompletionTime = []
	let tagsByTime = []

	allTasks.forEach((task) => {
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
			const foundIndex = tags.findIndex((t) => {
				const currentDate = new Date(task.createdDate)
				const existingDate = new Date(t.key.createdDate)
				return (
					t.key.id === tt.id &&
					currentDate.getMonth() === existingDate.getMonth() &&
					currentDate.getFullYear() === existingDate.getFullYear()
				)
			})
			if (foundIndex === -1) {
				tags.push({
					key: {
						id: tt.id,
						name: tt.title,
						createdDate: new Date(new Date(task.createdDate).getFullYear(), new Date(task.createdDate).getMonth(), 1)
					},
					value: 1
				})
			} else {
				tags[foundIndex].value += 1
			}
		})

		if (task.createdDate && task.closedDate && task.responsible.id) {
			const created = moment(task.createdDate)
			const closed = moment(task.closedDate)
			//tempo até fechar
			averageCompletionTime.push({
				// taskId: task.id,
				responsibleId: task.responsible.id,
				responsibleName: task.responsible.name,
				tags: task.tags,
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

	const groupedMembersAvg = lodash.groupBy(averageCompletionTime, 'responsibleId')
	const avgMemberTime = lodash.map(groupedMembersAvg, (g) => ({
		key: {
			id: g[0].responsibleId,
			name: g[0].responsibleName
		},
		value: Math.round((lodash.sumBy(g, 'completionTimeHours') / g.length) * 10) / 10
	}))
	const tagsCompletion = []
	averageCompletionTime.forEach((item) => {
		item.tags.forEach((it) => {
			tagsCompletion.push({ id: it.id, name: it.title, completionTimeHours: item.completionTimeHours })
		})
	})
	const groupedTagsAvg = lodash.groupBy(tagsCompletion, 'id')
	const avgTagTime = lodash.map(groupedTagsAvg, (g) => ({
		key: {
			id: g[0].id,
			name: g[0].name
		},
		value: Math.round((lodash.sumBy(g, 'completionTimeHours') / g.length) * 10) / 10
	}))

	const finalData = {
		usersGraphData: {
			auditors: formatToSeries(auditorsFormatted, ['Observadores'], 'desc'),
			creators: formatToSeries(creatorsFormatted, ['Criadores'], 'desc'),
			responsibles: formatToSeries(responsiblesFormatted, ['Responsáveis'], 'desc'),
			closers: formatToSeries(closersFormatted, ['Fechadores'], 'desc'),
			accomplices: formatToSeries(accomplicesFormatted, ['Participantes'], 'desc')
		},
		tagsGraphData: {
			popular: formatToSeries2(tags, 'desc')
		},
		completionGraphData: {
			averagePersonTime: formatToSeries(avgMemberTime, ['Média de tempo para finalização de tarefas por pessoa (em horas)'], 'desc'),
			averageTagTime: formatToSeries(avgTagTime, ['Média de tempo para finalização de tarefas por tag (em horas)'], 'desc')
		}
	}

	return finalData
}

export { buildOverviewMetrics, buildGraphsMetrics }
