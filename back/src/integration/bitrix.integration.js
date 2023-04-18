const axios = require('axios')
const config = require('../config')
const clientId = config.BITRIX.CLIENT_ID
const clientSecret = config.BITRIX.CLIENT_SECRET
const redirectUrl = config.ETC.BASE_FRONT_URL

const buildBaseAppBitrixUrl = (domain) => `https://${domain}.bitrix24.com.br` //retirar do hardcode depois projetusti
const baseAppBitrixUrl = 'https://projetusti.bitrix24.com.br'
let accessKeyBitrix = '1c6c3c64005e7b1b0058b7df0000012aa0ab07312dbb1106bb8690a60535817835547b'

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
const baseAppBitrixRestUrlTask = `${baseAppBitrixUrl}/rest/tasks.task.list.json?auth=${accessKeyBitrix}`
const baseAppBitrixRestUrlUser = `${baseAppBitrixUrl}/rest/user.get.json?auth=${accessKeyBitrix}`

const getMetric = async () => {
	return axios
		.get(baseAppBitrixRestUrlTask)
		.then((res) => {
			return res.data
		})
		.catch((e) => console.error(e))
}

const getRestUrlTask = () => {
	return baseAppBitrixRestUrlTask
}
const getRestUrlUser = () => {
	return baseAppBitrixRestUrlUser
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl,
	getMetric,
	getRestUrlTask,
	getRestUrlUser
}
