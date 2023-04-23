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
		let status = e.status || 500
		let message = e.message || 'Erro ao buscar grupos e membros'
		return res.status(status).send(message)
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
		let status = e.status || 500
		let message = e.message || 'Erro ao buscar métricas'
		return res.status(status).send(message)
	}
}

module.exports = {
	getOverviewMetrics,
	getAllGroupsAndMembers
}
