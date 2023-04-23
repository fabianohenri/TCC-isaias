require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()
const UserResource = require('./resource/userAccount.resource')
const DashboardResource = require('./resource/dashboard.resource')

const port = 4000

const PREFIX = '/api'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const interceptor = (req, res, next) => {
	const token = req.headers.authorization
	if (!req.originalUrl.includes('/login')) {
		if (token) {
			try {
				const tokenData = jwt.verify(token.split(' ')[1], config.JWT_SECRET_KEY)
				req.userInfo = tokenData
			} catch (e) {
				console.error(e)
				res.status(403).json({ error: 'Favor autenticar novamente no sistema' })
				return
			}
		} else {
			res.status(403).json({ error: 'É necessário ter autenticação no sistema' })
		}
	}
	next()
}
app.use(interceptor)

app.get(PREFIX + '/login/get-url-auth/:domainBitrix', UserResource.getUrlAuth)
app.get(PREFIX + '/login', UserResource.loginOrCreateAccount)

//dashboard
app.get(PREFIX + '/dashboard/get-all-groups-with-members/:fromDate/:toDate', DashboardResource.getAllGroupsAndMembers)
// app.get(PREFIX + '/dashboard/get-all-groups/:fromDate/:toDate', DashboardResource.getGroups)
// app.get(PREFIX + '/dashboard/get-all-members/:fromDate/:toDate', DashboardResource.getMembers)
app.get(PREFIX + '/dashboard/get-overview-metrics', DashboardResource.getOverviewMetrics)

app.listen(port, () => {
	console.info(`---- API funcionando na porta ${port} -----`)
})
