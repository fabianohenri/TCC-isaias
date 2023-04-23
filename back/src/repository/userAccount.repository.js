const { pool } = require('../db')

const saveNewAccess = async (access_token, refresh_token, scope, accountId) => {
	const { rows } = await pool.query(
		`
        UPDATE user_account 
        SET access_token_bitrix = $1, refresh_token_bitrix = $2, scope_bitrix = $3
        WHERE id = $4
		RETURNING *
    `,
		[access_token, refresh_token, scope, accountId]
	)
	return rows[0]
}
const createAccount = async (access_token, refresh_token, scope, userIdBitrix, domainBitrix, userName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO user_account(access_token_bitrix, refresh_token_bitrix, scope_bitrix, user_id_bitrix, domain_bitrix, username)
        VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING *
    `,
		[access_token, refresh_token, scope, userIdBitrix, domainBitrix, userName]
	)

	return rows[0]
}

const findByUserIdBitrixAndDomain = async (userId, domain) => {
	const { rows } = await pool.query(
		`
        SELECT * FROM user_account ua WHERE ua.user_id_bitrix = $1 AND ua.domain_bitrix = $2
    `,
		[userId, domain]
	)
	return rows[0]
}

const getUsersByIds = async (userIds) => {
	const { rows } = await pool.query(
		`
      	SELECT * FROM user_account 
		WHERE id = $1
    `,
		[userIds]
	)

	return rows
}

module.exports = { saveNewAccess, createAccount, getUsersByIds, findByUserIdBitrixAndDomain }
