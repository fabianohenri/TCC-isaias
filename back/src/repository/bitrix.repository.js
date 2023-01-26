const { pool } = require('../db')

const saveNewAccess = async (access_token, refresh_token, scope, accountId) => {
	await pool.query(
		`
        UPDATE user_account 
        SET access_key_bitrix = $1, refresh_token_bitrix = $2, scope_bitrix = $3
        WHERE id = $4
    `,
		[access_token, refresh_token, scope, accountId]
	)
}
const createAccount = async (access_token, refresh_token, scope, userIdBitrix, domainBitrix) => {
	await pool.query(
		`
        INSERT INTO user_account(access_key_bitrix, refresh_token_bitrix, scope_bitrix, user_id_bitrix, domain_bitrix)
        VALUES ($1,$2,$3,$4,$5)
    `,
		[access_token, refresh_token, scope, userIdBitrix, domainBitrix]
	)
}

const findByUserIdBitrixAndDomain = async (userId, domain) => {
	const { rows } = await pool.query(
		`
        SELECT id FROM user_account ua WHERE ua.user_id_bitrix = $1 AND ua.domain_bitrix = $2
    `,
		[userId, domain]
	)
	return rows[0]
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

module.exports = { saveNewAccess, createAccount, getUserAuth, findByUserIdBitrixAndDomain }
