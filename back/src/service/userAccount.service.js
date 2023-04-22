const BitrixIntegration = require('../integration/bitrix.integration')
const UserRepository = require('../repository/userAccount.repository')

const getUrlAuth = async (domainBitrix) => {
	return await BitrixIntegration.getUrlAuth(domainBitrix)
}

const getUserAuth = async () => {
	const userId = 1
	const userAuth = await UserRepository.getUserAuth(userId)
	return userAuth
}

const loginOrCreateAccount = async (authCode, scope) => {
	const accessBitrix = await BitrixIntegration.getFinalAccessUrl(authCode, scope)
	const accountExists = await UserRepository.findByUserIdBitrixAndDomain(accessBitrix.user_id, accessBitrix.domain)
	if (accountExists) {
		return await UserRepository.saveNewAccess(accessBitrix.access_token, accessBitrix.refresh_token, accessBitrix.scope, accountExists.id)
	} else {
		return await UserRepository.createAccount(
			accessBitrix.access_token,
			accessBitrix.refresh_token,
			accessBitrix.scope,
			accessBitrix.user_id,
			accessBitrix.domain
		)
	}
}

module.exports = {
	getUrlAuth,
	getUserAuth,
	loginOrCreateAccount
}
