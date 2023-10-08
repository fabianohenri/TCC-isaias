import lodash from 'lodash'

const formatToSeries = (formattedData, labels, orderBy) => {
	if (orderBy) {
		formattedData = lodash.orderBy(formattedData, 'value', orderBy)
	}
	// const seriesDataObject = { series: formattedData.map((it) => ({ name: it?.key?.name || 'Usuário não encontrado', data: [it?.value] })), labels }
	//Retirando usuarios indefinidos
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
		}
	}

	return finalData
}

export { buildOverviewMetrics }
