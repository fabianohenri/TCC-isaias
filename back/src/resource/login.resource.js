const LoginService = require('../service/login.service')

const getUrlAuth = async (req, res) => {
	try {
		const domainBitrix = req.params.domainBitrix
		const data = await LoginService.getUrlAuth(domainBitrix)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar url de autenticação')
	}
}

const loginOrCreateAccount = async (req, res) => {
	const authCode = req.query.authCode
	const scope = req.query.scope
	const domain = req.query.domain

	try {
		const data = await LoginService.loginOrCreateAccount(authCode, scope, domain)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar url de autenticação')
	}
}

const getInfoAccount = async (req, res) => {
	const userId = req.userInfo.userId
	try {
		const data = await LoginService.getInfoAccount(userId)
		return res.status(200).send(data)
	} catch (e) {
		console.error(e)
		return res.status(500).send('Erro ao buscar informações do usuário')
	}
}

module.exports = {
	getUrlAuth,
	loginOrCreateAccount,
	getInfoAccount
}
