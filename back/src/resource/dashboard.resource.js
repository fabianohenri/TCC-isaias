const DashboardService = require('../service/dashboard.service')
const { extractGlobalFiltersFromRequest } = require('../utils/utils')

const getAllGroupsAndMembers = async (req, res) => {
	const fromDate = req.params.fromDate
	const toDate = req.params.toDate
	const userId = req.userInfo.userId

	try {
		const data = await DashboardService.getAllGroupsAndMembers(userId, fromDate, toDate)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

const getOverviewMetrics = async (req, res) => {
	const userId = req.userInfo.userId
	const { fromDate, toDate, groups, members, taskStatus } = extractGlobalFiltersFromRequest(req)

	try {
		const data = await DashboardService.getOverviewMetrics(userId, fromDate, toDate, groups, members, taskStatus)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

module.exports = {
	getOverviewMetrics,
	getAllGroupsAndMembers
}
