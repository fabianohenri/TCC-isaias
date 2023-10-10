import { Card, Grid, Typography } from '@mui/material'
import moment from 'moment-timezone'
import React, { useState, useEffect } from 'react'
import api from 'service/service'
import SkeletonLoad from 'react-loading-skeleton'

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
			{loading ? (
				<Card style={{ borderRadius: '20px', height: '100%', width: '100%' }}>
					<SkeletonLoad height='100%' width='100%' style={{ marginTop: '-20px', lineHeight: 'inherit' }} />
				</Card>
			) : (
				<Card style={{ padding: '6em 4em', width: '100%' }}>
					<>
						<Typography color='text.secondary'>
							Nome: <span style={{ color: '#05143c' }}>{info?.username}</span>
						</Typography>
						<Typography style={{ marginTop: '3em' }} color='text.secondary'>
							Domínio: <span style={{ color: '#05143c' }}>{info?.domain_bitrix}</span>
						</Typography>
						<Typography style={{ marginTop: '3em' }} color='text.secondary'>
							Escopo da integração: <span style={{ color: '#05143c' }}>{info?.scope_bitrix}</span>
						</Typography>
						<Typography style={{ marginTop: '3em' }} color='text.secondary'>
							Conta criada no sistema em: <span style={{ color: '#05143c' }}>{moment(info?.created_at).format('DD/MM/yyyy')}</span>
						</Typography>
					</>
				</Card>
			)}
		</Grid>
	)
}

export default AccountInfo
