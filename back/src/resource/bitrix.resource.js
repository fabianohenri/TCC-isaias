const BitrixService = require('../service/bitrix.service')

const getUrlAuth = async (req, res) => {
	try {
		const data = await BitrixService.getUrlAuth()
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar url de autenticação')
	}
}

const getFinalAccessUrl = async (req, res) => {
	const authCode = req.query.authCode
	const scope = req.query.scope

	try {
		const data = await BitrixService.getFinalAccessUrl(authCode, scope)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar url de autenticação')
	}
}

const getUserAuth = async (req, res) => {
	try {
		const data = await BitrixService.getUserAuth()
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar url de autenticação')
	}
}

const getMetric = async (req, res) => {
	try {
		const data = await BitrixService.getMetric()
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar url de autenticação')
	}
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl,
	getUserAuth,
	getMetric
}
