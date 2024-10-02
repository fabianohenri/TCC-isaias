require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()
const LoginResource = require('./resource/login.resource')
const DashboardResource = require('./resource/dashboard.resource')

const port = 4000

const PREFIX = '/api'

// // Configuração de CORS
// const corsOptions = {
// 	origin: 'https://grafico-bitrix.projetusti.com.br', // Permite requisições apenas do domínio do front-end
// 	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
// 	allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
// 	credentials: true, // Permite enviar cookies e cabeçalhos de autorização
//   };

// app.use(cors())
app.use()
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

//Login
app.get(PREFIX + '/login/get-url-auth/:domainBitrix', LoginResource.getUrlAuth)
app.get(PREFIX + '/login', LoginResource.loginOrCreateAccount)
app.get(PREFIX + '/account/get-info', LoginResource.getInfoAccount)

//dashboard
app.get(PREFIX + '/dashboard/get-all-tasks-and-groups-with-members/:fromDate/:toDate', DashboardResource.getAllTasksAndGroupsWithMembers)

app.listen(port, () => {
	console.info(`---- API funcionando na porta ${port} -----`)
})
