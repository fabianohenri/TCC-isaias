const TaskService = require('../service/task.service')

const getTotalPerMonth = async (req, res) => {
	try {
		const data = await TaskService.getTotalPerMonth()
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

const getTotalTicketsPerson = async (req, res) => {
	const status = req.query.taskStatus
	try {
		const data = await TaskService.getTotalTicketsPerson(status)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar métricas')
	}
}

module.exports = {
	getTotalPerMonth,
	getTotalTicketsPerson
}
