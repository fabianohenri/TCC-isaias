const TaskService = require('../service/task.service')
const { extractGlobalFiltersFromRequest } = require('../utils/utils')

const getAllGroupsAndMembers = async (req, res) => {
	const fromDate = req.params.fromDate
	const toDate = req.params.toDate

	try {
		const data = await TaskService.getAllGroupsAndMembers(fromDate, toDate)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

const getTotalPerMonth = async (req, res) => {
	try {
		const data = await TaskService.getTotalPerMonth()
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

const getOverviewMetrics = async (req, res) => {
	const { fromDate, toDate, groups, members, taskStatus } = extractGlobalFiltersFromRequest(req)

	try {
		const data = await TaskService.getOverviewMetrics(fromDate, toDate, groups, members, taskStatus)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

// const getGroups = async (req, res) => {
// 	const fromDate = req.params.fromDate
// 	const toDate = req.params.toDate
// 	const membersIds = req.query.membersIds

// 	try {
// 		const data = await TaskService.getGroups(fromDate, toDate, membersIds)
// 		return res.status(200).send(data)
// 	} catch (e) {
// 		console.error(e)
// 		return res.status(500).send('Erro ao buscar métricas')
// 	}
// }
// const getMembers = async (req, res) => {
// 	const fromDate = req.params.fromDate
// 	const toDate = req.params.toDate
// 	const groupsIds = req.params.groupsIds

// 	try {
// 		const data = await TaskService.getMembers(fromDate, toDate, groupsIds)
// 		return res.status(200).send(data)
// 	} catch (e) {
// 		console.error(e)
// 		return res.status(500).send('Erro ao buscar métricas')
// 	}
// }

module.exports = {
	getTotalPerMonth,
	getOverviewMetrics,
	// getGroups,
	// getMembers,
	getAllGroupsAndMembers
}
