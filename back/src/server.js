const express = require('express')
const app = express()
const cors = require('cors')
const BitrixResource = require('./resource/bitrix.resource')

const port = 4000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/get-url-auth', BitrixResource.getUrlAuth)

app.listen(port, () => {
	console.info(`---- API funcionando na porta ${port} -----`)
})
