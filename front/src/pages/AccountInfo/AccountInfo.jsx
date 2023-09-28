import React, { useState, useEffect } from 'react'
import api from 'service/service'

const AccountInfo = () => {
	const [info, setInfo] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		load()
	}, [])

	const load = () => {
		setLoading(true)
		api.get('/account/get-info')
			.then((res) => {
				setInfo(res.data)
			})
			.catch(() => {
				//todo
			})
			.finally(() => setLoading(false))
	}

	return (
		<div style={{ height: '94vh' }}>
			{loading ? (
				<>carregando</>
			) : (
				<>
					<div>username: {info.username}</div>
					<div>scope: {info.scope_bitrix}</div>
					<div>dominio: {info.domain_bitrix}</div>
					<div>conta criada em (no sistema): {info.created_at}</div>
				</>
			)}
		</div>
	)
}

export default AccountInfo
