import { Card, Grid, Typography } from '@mui/material'
import moment from 'moment-timezone'
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
		<Grid container style={{ padding: '2em', height: '93%' }}>
			<Card style={{ padding: '6em 4em', width: '100%' }}>
				{loading ? (
					<>carregando</>
				) : (
					<>
						<Typography style={{ opacity: 0.95 }}>
							Nome: <span style={{ color: '#05143c' }}>{info.username}</span>
						</Typography>
						<Typography style={{ opacity: 0.95, marginTop: '3em' }}>
							Domínio: <span style={{ color: '#05143c' }}>{info.domain_bitrix}</span>
						</Typography>
						<Typography style={{ opacity: 0.95, marginTop: '3em' }}>
							Escopo da integração: <span style={{ color: '#05143c' }}>{info.scope_bitrix}</span>
						</Typography>
						<Typography style={{ opacity: 0.95, marginTop: '3em' }}>
							Conta criada no sistema em: <span style={{ color: '#05143c' }}>{moment(info.created_at).format('DD/MM/yyyy')}</span>
						</Typography>
					</>
				)}
			</Card>
		</Grid>
	)
}

export default AccountInfo
