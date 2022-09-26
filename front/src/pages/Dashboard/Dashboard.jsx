import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from 'service/service'

const Dashboard = () => {
	const [userAuth, setUserAuth] = useState(null)
	const [loading, setLoading] = useState(true)

	const [metric, setMetric] = useState(null)
	const [loadingMetric, setLoadingMetric] = useState(false)

	useEffect(() => {
		api.get('/get-user-auth')
			.then((res) => {
				setLoading(false)
				setUserAuth(res.data)
			})
			.catch((e) => console.error(e.response.data))
	}, [])

	useEffect(() => {
		console.log(userAuth)
	}, [userAuth])

	const getMetric = () => {
		setLoadingMetric(true)
		api.get('/get-metric')
			.then((res) => {
				setLoadingMetric(false)
				setMetric(res.data)
			})
			.catch((e) => console.error(e.response.data))
	}

	useEffect(() => {
		console.log(userAuth)
	}, [metric])

	return (
		<>
			<h2>{loading ? 'Carregando dados' : 'Dados carregados'}</h2>
			<Button disabled={loading || loadingMetric} onClick={getMetric}>
				{loadingMetric ? 'Carregando métricas' : 'Buscar métrica teste'}
			</Button>
		</>
	)
}

export default Dashboard
