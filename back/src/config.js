const DB = {
	user: process.env.DATABASE_USER,
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
	port: 5432,
	ssl: false,
	connectionTimeoutMillis: 15000
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const BITRIX = {
	CLIENT_ID: process.env.BITRIX_CLIENT_ID,
	CLIENT_SECRET: process.env.BITRIX_CLIENT_SECRET
}

const ETC = {
	BASE_FRONT_URL: process.env.BASE_FRONT_URL
}

module.exports = {
	JWT_SECRET_KEY,
	DB,
	BITRIX,
	ETC
}
