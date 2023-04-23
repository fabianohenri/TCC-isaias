const axios = require('axios')
const config = require('../config')
const clientId = config.BITRIX.CLIENT_ID
const clientSecret = config.BITRIX.CLIENT_SECRET
const redirectUrl = config.ETC.BASE_FRONT_URL

const buildBaseAppBitrixUrl = (domain) => `https://${domain}.bitrix24.com.br`
const baseAppBitrixUrl = buildBaseAppBitrixUrl('projetusti') //retirar do hardcode depois projetusti
let accessTokenBitrix = '1c6c3c64005e7b1b0058b7df0000012aa0ab07312dbb1106bb8690a60535817835547b'

//1 passo login
const getUrlAuth = async (domainBitrix) =>
	`https://${domainBitrix}.bitrix24.com.br/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}`

//2 passo login
const buildFinalAccessUrl = (authCode, scope) =>
	`${baseAppBitrixUrl}/oauth/token/?client_id=${clientId}&grant_type=authorization_code&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&code=${authCode}&scope=${scope}`

const getFinalAccessUrl = async (authCode, scope) => {
	return axios
		.get(buildFinalAccessUrl(authCode, scope))
		.then((res) => {
			const { access_token, refresh_token, scope, user_id, domain } = res.data
			return { access_token, refresh_token, scope, user_id, domain }
		})
		.catch((e) => console.error(e))
}

//Metricas
const baseAppBitrixRestUrlTask = `${baseAppBitrixUrl}/rest/tasks.task.list.json?auth=${accessTokenBitrix}`
const baseAppBitrixRestUrlUser = (accessToken) => `${baseAppBitrixUrl}/rest/user.get.json?auth=${accessToken}`

const getRestUrlTask = () => {
	return baseAppBitrixRestUrlTask
}
const getBitrixUsersByIds = async (formattedUserIdsParams, accessToken) => {
	let res = await axios.get(baseAppBitrixRestUrlUser(accessToken) + formattedUserIdsParams)
	return res.data.result
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl,
	getRestUrlTask,
	getBitrixUsersByIds
}
