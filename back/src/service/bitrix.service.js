const BitrixIntegration = require('../integration/bitrix.integration')
const BitrixRepository = require('../repository/bitrix.repository')

const getUrlAuth = async (domainBitrix) => {
	return await BitrixIntegration.getUrlAuth(domainBitrix)
}

const loginOrCreateAccount = async (authCode, scope) => {
	const accessBitrix = await BitrixIntegration.getFinalAccessUrl(authCode, scope)
	const accountExists = await BitrixRepository.findByUserIdBitrixAndDomain(accessBitrix.user_id, accessBitrix.domain)
	if (accountExists) {
		return await BitrixRepository.saveNewAccess(accessBitrix.access_token, accessBitrix.refresh_token, accessBitrix.scope, accountExists.id)
	} else {
		return await BitrixRepository.createAccount(
			accessBitrix.access_token,
			accessBitrix.refresh_token,
			accessBitrix.scope,
			accessBitrix.user_id,
			accessBitrix.domain
		)
	}
}

const getUserAuth = async () => {
	const userId = 1
	const userAuth = await BitrixRepository.getUserAuth(userId)
	return userAuth
}

const getMetric = async () => {
	const metric = await BitrixIntegration.getMetric()
	return metric
}

module.exports = {
	getUrlAuth,
	loginOrCreateAccount,
	getUserAuth,
	getMetric
}
