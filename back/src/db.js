const Pool = require('pg').Pool
const Config = require('./config')

const pool = new Pool(Config.DB)

module.exports = {
	pool
}
