const axios = require('axios')
const clientId = 'local.632f249814efe3.38532742'
const clientSecret = 'JTYXWWJ8ARBkKab9AIsqsUhpK0FZGGG2wievhUeFnjX2ALWjNu'
const redirectUrl = 'http://localhost:3000'
const baseAppBitrixUrl = 'https://b24-3e2lns.bitrix24.com.br'
const getAuthCodeUrl = `${baseAppBitrixUrl}/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}`

const buildFinalAccessUrl = (authCode, scope) =>
	`${baseAppBitrixUrl}/oauth/token/?client_id=${clientId}&grant_type=authorization_code&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&code=${authCode}&scope=${scope}`

const getUrlAuth = async () => {
	return getAuthCodeUrl
}

const baseAppBitrixRestUrl = `${baseAppBitrixUrl}/rest/tasks.task.list.json?auth=a6da3863005dffdd005dfd2100000001a0ab0782d36ad5f47bfa1497e9b3c58557a162`

const getFinalAccessUrl = async (authCode, scope) => {
	return axios
		.get(buildFinalAccessUrl(authCode, scope))
		.then((res) => {
			return ({ access_token, refresh_token, scope } = res.data)
		})
		.catch((e) => console.error(e))
}

const getMetric = async () => {
	return axios
		.get(baseAppBitrixRestUrl)
		.then((res) => {
			return res.data
		})
		.catch((e) => console.error(e))
}

const getRestUrl = () => {
	return baseAppBitrixRestUrl
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl,
	getMetric,
	getRestUrl
}
