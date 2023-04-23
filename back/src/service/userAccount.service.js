const jwt = require('jsonwebtoken')
const BitrixIntegration = require('../integration/bitrix.integration')
const BitrixService = require('./bitrix.service')
const UserRepository = require('../repository/userAccount.repository')
const config = require('../config')

const getUrlAuth = async (domainBitrix) => {
	return await BitrixIntegration.getUrlAuth(domainBitrix)
}

const loginOrCreateAccount = async (authCode, scope) => {
	const accessBitrix = await BitrixIntegration.getFinalAccessUrl(authCode, scope)
	const accountExists = await UserRepository.findByUserIdBitrixAndDomain(accessBitrix.user_id, accessBitrix.domain)

	let userData = {}
	if (accountExists) {
		userData = await UserRepository.saveNewAccess(accessBitrix.access_token, accessBitrix.refresh_token, accessBitrix.scope, accountExists.id)
	} else {
		const [bitrixUserData] = await BitrixService.getBitrixUsersByIds([accessBitrix.user_id], accessBitrix.access_token)
		const userName = bitrixUserData.NAME + ' ' + bitrixUserData.LAST_NAME
		userData = await UserRepository.createAccount(
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
				refresh_token_bitrix: userData.refresh_token_bitrix,
				access_token_bitrix: userData.access_token_bitrix,
				domainBitrix: userData.domain_bitrix
			},
			config.JWT_SECRET_KEY,
			{
				expiresIn: 60 * 60 * config.ETC.KEEP_CONNECTED_HOURS
			}
		)
	}

	return userDataFormatted
}

//nao usada no momento, mas irei usar para fazer a atualização do token
const getUsersByIds = async (userIds) => {
	const users = await UserRepository.getUsersByIds(userIds)
	return users
}

module.exports = {
	getUrlAuth,
	loginOrCreateAccount,
	getUsersByIds
}
