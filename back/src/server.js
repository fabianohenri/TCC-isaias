require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const UserResource = require('./resource/userAccount.resource')
const DashboardResource = require('./resource/dashboard.resource')

const port = 4000

const PREFIX = '/api'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get(PREFIX + '/get-url-auth/:domainBitrix', UserResource.getUrlAuth)
app.get(PREFIX + '/login', UserResource.loginOrCreateAccount)
app.get(PREFIX + '/get-user-auth', UserResource.getUserAuth)

//dashboard
app.get(PREFIX + '/dashboard/get-all-groups-with-members/:fromDate/:toDate', DashboardResource.getAllGroupsAndMembers)
// app.get(PREFIX + '/dashboard/get-all-groups/:fromDate/:toDate', DashboardResource.getGroups)
// app.get(PREFIX + '/dashboard/get-all-members/:fromDate/:toDate', DashboardResource.getMembers)
app.get(PREFIX + '/dashboard/get-overview-metrics', DashboardResource.getOverviewMetrics)

app.listen(port, () => {
	console.info(`---- API funcionando na porta ${port} -----`)
})
