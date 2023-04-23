const BitrixResource = require('./resource/bitrix.resource')

const routes = [
	{
		path: '/login/get-url-auth/:domainBitrix',
		method: 'get',
		needAuth: true,
		handler: BitrixResource.getUrlAuth
	},
	{
		path: '/login',
		method: 'get',
		needAuth: true,
		handler: BitrixResource.loginOrCreateAccount
	}
]

module.exports = {
	routes
}
