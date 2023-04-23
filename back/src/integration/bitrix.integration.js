const axios = require('axios')
const config = require('../config')
const { CLIENT_ID, CLIENT_SECRET, URL } = config.BITRIX
const redirectUrl = config.ETC.BASE_FRONT_URL

//1 passo login
const getUrlAuth = async (domainBitrix) =>
	`https://${domainBitrix + '.' + URL}/oauth/authorize/?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}`

//2 passo login
const buildFinalAccessUrl = (authCode, scope, bitrixFullDomain) =>
	`https://${bitrixFullDomain}/oauth/token/?client_id=${CLIENT_ID}&grant_type=authorization_code&client_secret=${CLIENT_SECRET}&redirect_uri=${redirectUrl}&code=${authCode}&scope=${scope}`

const getFinalAccessUrl = async (authCode, scope, bitrixFullDomain) => {
	return axios
		.get(buildFinalAccessUrl(authCode, scope, bitrixFullDomain))
		.then((res) => {
			const { access_token, refresh_token, scope, user_id, domain } = res.data
			return { access_token, refresh_token, scope, user_id, domain }
		})
		.catch((e) => console.error(e))
}

//Metricas
const baseAppBitrixRestUrlTask = (bitrixFullDomain, bitrixAccessToken) =>
	`https://${bitrixFullDomain}/rest/tasks.task.list.json?auth=${bitrixAccessToken}`
const baseAppBitrixRestUrlUser = (bitrixFullDomain, bitrixAccessToken) => `https://${bitrixFullDomain}/rest/user.get.json?auth=${bitrixAccessToken}`

const getRestUrlTask = (bitrixFullDomain, bitrixAccessToken) => {
	return baseAppBitrixRestUrlTask(bitrixFullDomain, bitrixAccessToken)
}
const getBitrixUsersByIds = async (bitrixFullDomain, bitrixAccessToken, formattedUserIdsParams) => {
	let res = await axios.get(baseAppBitrixRestUrlUser(bitrixFullDomain, bitrixAccessToken) + formattedUserIdsParams)
	return res.data.result
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl,
	getRestUrlTask,
	getBitrixUsersByIds
}
