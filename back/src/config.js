const DB = {
	// user: process.env.DATABASE_USER,
	// host: process.env.DATABASE_HOST,
	// database: process.env.DATABASE_NAME,
	// password: process.env.DATABASE_PASSWORD,
	user: 'postgres',
	host: 'infra-pg-15-svc.databases.svc.cluster.local',
	database: 'graficos-bitrix',
	password: 'rmURC0F76NH2',
	port: 5432,
	ssl: false,
	connectionTimeoutMillis: 15000
}

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_SECRET_KEY = '99999a9999aAA'

const BITRIX = {
	// CLIENT_ID: process.env.BITRIX_CLIENT_ID,
	// CLIENT_SECRET: process.env.BITRIX_CLIENT_SECRET,
	// URL: process.env.BITRIX_URL
	CLIENT_ID: 'local.66fb0e70d99067.57999783',
	CLIENT_SECRET: 'amhQjfQZiAUmB5cS0N1X2rcZpIfCzVtWjLS8Msk8gHVky1APSF',
	URL: 'bitrix24.com.br'
}

const ETC = {
	BASE_FRONT_URL: 'https://grafico-bitrix.projetusti.com.br',
	KEEP_CONNECTED_HOURS: 720 //30 dias
}

module.exports = {
	JWT_SECRET_KEY,
	DB,
	BITRIX,
	ETC
}
