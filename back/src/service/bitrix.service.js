const BitrixIntegration = require('../integration/bitrix.integration')
const BitrixRepository = require('../repository/bitrix.repository')

const getUrlAuth = async () => {
	return await BitrixIntegration.getUrlAuth()
}

const getFinalAccessUrl = async (authCode, scope) => {
	const userId = 1
	const accessBitrix = await BitrixIntegration.getFinalAccessUrl(authCode, scope)
	await BitrixRepository.saveAccessBitrixByUserId(accessBitrix.access_token, accessBitrix.refresh_token, accessBitrix.scope, userId)
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl
}
