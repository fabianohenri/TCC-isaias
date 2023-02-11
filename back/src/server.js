require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const BitrixResource = require('./resource/bitrix.resource')
const TaskResource = require('./resource/task.resource')

const port = 4000

const PREFIX = '/api'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get(PREFIX + '/get-url-auth/:domainBitrix', BitrixResource.getUrlAuth)
app.get(PREFIX + '/login', BitrixResource.loginOrCreateAccount)
app.get(PREFIX + '/get-user-auth', BitrixResource.getUserAuth)
app.get(PREFIX + '/get-metric', BitrixResource.getMetric)

app.get(PREFIX + '/task/get-total-per-month', TaskResource.getTotalPerMonth)
app.get(PREFIX + '/task/get-overview-metrics', TaskResource.getOverviewMetrics)

app.listen(port, () => {
	console.info(`---- API funcionando na porta ${port} -----`)
})
