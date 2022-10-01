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

app.get(PREFIX + '/get-url-auth', BitrixResource.getUrlAuth)
app.get(PREFIX + '/get-url-final-auth', BitrixResource.getFinalAccessUrl)
app.get(PREFIX + '/get-user-auth', BitrixResource.getUserAuth)
app.get(PREFIX + '/get-metric', BitrixResource.getMetric)

app.get(PREFIX + '/task/get-total-per-month', TaskResource.getTotalPerMonth)
app.get(PREFIX + '/task/get-total-per-person', TaskResource.getTotalTicketsPerson)

app.listen(port, () => {
	console.info(`---- API funcionando na porta ${port} -----`)
})
