const { pool } = require('../db')

const saveAccessBitrixByUserId = async (access_token, refresh_token, scope, userId) => {
	await pool.query(
		`
        UPDATE user_account 
        SET access_key_bitrix = $1, refresh_token_bitrix = $2, scope_bitrix = $3
        WHERE id = $4
    `,
		[access_token, refresh_token, scope, userId]
	)
}

module.exports = { saveAccessBitrixByUserId }
