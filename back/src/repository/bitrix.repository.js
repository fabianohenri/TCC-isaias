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

const getUserAuth = async (userId) => {
	const { rows } = await pool.query(
		`
      	SELECT * FROM user_account 
		WHERE id = $1
    `,
		[userId]
	)

	return rows[0]
}

module.exports = { saveAccessBitrixByUserId, getUserAuth }
