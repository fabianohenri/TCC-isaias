const jwt = require('jsonwebtoken')
const BitrixService = require('./bitrix.service') //ver se pra resolver a dependencia circular, colocar essa parte que ta no service no integration funciona
const UserAccountRepository = require('../repository/userAccount.repository')
const config = require('../config')

const getUrlAuth = async (domainBitrix) => {
	return await BitrixService.getUrlAuth(domainBitrix)
}

const loginOrCreateAccount = async (authCode, scope, domain) => {
	console.log('AuthCode: ', authCode)
	console.log('scope: ', scope)
	console.log('domain:', domain)

	const accessBitrix = await BitrixService.getFinalAccessUrl(authCode, scope, domain)
	console.log('Dados do accessBitrix: ', accessBitrix)
	console.log('Retorno de obter final acess user_id: ', accessBitrix.user_id)
	console.log('Retorno de obter final acess: ', accessBitrix.domain)

	const accountExists = await UserAccountRepository.findByUserIdBitrixAndDomain(accessBitrix.user_id, accessBitrix.domain)
	console.log('Retorno da pesquisa se a conta existe:' + accountExists.data)
	let userData = {}
	if (accountExists) {
		userData = await UserAccountRepository.saveNewAccess(
			accessBitrix.access_token,
			accessBitrix.refresh_token,
			accessBitrix.scope,
			accountExists.id
		)
	} else {
		console.error('Conta não existente, iniciando a criação.')
		const bitrixAccessFormatted = {
			fullDomain: accessBitrix.domain,
			accessToken: accessBitrix.access_token,
			refreshToken: accessBitrix.refresh_token
		}
		const [bitrixUserData] = await BitrixService.getBitrixUsersByIds([accessBitrix.user_id], bitrixAccessFormatted)
		const userName = (bitrixUserData.NAME + ' ' + bitrixUserData.LAST_NAME).trim()
		userData = await UserAccountRepository.createAccount(
			accessBitrix.access_token,
			accessBitrix.refresh_token,
			accessBitrix.scope,
			accessBitrix.user_id,
			accessBitrix.domain,
			userName
		)
	}

	const userDataFormatted = {
		userId: userData.id,
		name: userData.username,
		token: jwt.sign(
			{
				userId: userData.id,
				userIdBitrix: userData.user_id_bitrix,
				fullDomain: userData.domain_bitrix
			},
			config.JWT_SECRET_KEY,
			{
				expiresIn: 60 * 60 * config.ETC.KEEP_CONNECTED_HOURS
			}
		)
	}

	return userDataFormatted
}

const getInfoAccount = async (userId) => {
	const user = await UserAccountRepository.getUsersByIds(userId)
	return user[0]
}

module.exports = {
	getUrlAuth,
	loginOrCreateAccount,
	getInfoAccount
}
