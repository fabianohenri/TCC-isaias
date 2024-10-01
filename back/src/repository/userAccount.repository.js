const { pool } = require('../db')

const saveNewAccess = async (accessToken, refreshToken, scope, accountId) => {
	const { rows } = await pool.query(
		`
		UPDATE user_account 
		SET access_token_bitrix = $1, refresh_token_bitrix = $2, scope_bitrix = $3, updated_at = NOW()
		WHERE id = $4
		RETURNING *
	`,
		[accessToken, refreshToken, scope, accountId]
	)
	console.log("Atualizando dados de acesso.")
	return rows[0]
}

const refreshAccess = async (accessToken, refreshToken, userIdBitrix) => {
	const { rows } = await pool.query(
		`
		UPDATE user_account 
		SET access_token_bitrix = $1, refresh_token_bitrix = $2, updated_at = NOW()
		WHERE user_id_bitrix = $3
		RETURNING *
	`,
		[accessToken, refreshToken, userIdBitrix]
	)
	console.log("Efetuando a renovação do acesso")
	return rows[0]
}

const createAccount = async (accessToken, refreshToken, scope, userIdBitrix, domainBitrix, userName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO user_account(access_token_bitrix, refresh_token_bitrix, scope_bitrix, user_id_bitrix, domain_bitrix, username)
        VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING *
    `,
		[accessToken, refreshToken, scope, userIdBitrix, domainBitrix, userName]
	)
	console.log("Criação da conta no banco de dados. Retorno: " + rows[0])
	return rows[0]
}

const findByUserIdBitrixAndDomain = async (userId, domain) => {
	const { rows } = await pool.query(
		`
        SELECT * FROM user_account ua WHERE ua.user_id_bitrix = $1 AND ua.domain_bitrix = $2
    `,
		[userId, domain]
	)
	console.log("Busca pelo usuário de id: $1", [userId])
	return rows[0]
}

const getUsersByIds = async (userIds) => {
	const { rows } = await pool.query(
		`
      	SELECT * FROM user_account 
		WHERE id in($1)
    `,
		[userIds]
	)
	console.log("Coletando dados do usuáiro: $1", [userId])
	return rows
}

module.exports = { saveNewAccess, createAccount, getUsersByIds, findByUserIdBitrixAndDomain, refreshAccess }
