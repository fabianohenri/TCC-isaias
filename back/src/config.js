const DATABASE = {
	user: process.env.DATABASE_USER,
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
	port: 5432,
	ssl: false,
	connectionTimeoutMillis: 10000
}

// ssl: {
//     rejectUnauthorized: false
// }

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports = {
	JWT_SECRET_KEY,
	DB: DATABASE
}
