const TaskService = require('../service/task.service')

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
	const status = req.query.taskStatus
	try {
		const data = await TaskService.getOverviewMetrics(status)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

module.exports = {
	getTotalPerMonth,
	getOverviewMetrics,
	getAllGroupsAndMembers
}
