const axios = require('axios')
const clientId = 'local.632f249814efe3.38532742'
const clientSecret = 'JTYXWWJ8ARBkKab9AIsqsUhpK0FZGGG2wievhUeFnjX2ALWjNu'
const redirectUrl = 'http://localhost:3000'

const getAuthCodeUrl = `http://b24-3e2lns.bitrix24.com.br/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}`
const buildFinalAccessUrl = (authCode, scope) =>
	`https://b24-3e2lns.bitrix24.com.br/oauth/token/?client_id=${clientId}&grant_type=authorization_code&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&code=${authCode}&scope=${scope}`

const getUrlAuth = async () => {
	return getAuthCodeUrl
}

const getFinalAccessUrl = async (authCode, scope) => {
	return axios
		.get(buildFinalAccessUrl(authCode, scope))
		.then((res) => {
			return ({ access_token, refresh_token, scope } = res.data)
		})
		.catch((e) => console.error(e))
}

module.exports = {
	getUrlAuth,
	getFinalAccessUrl
}
